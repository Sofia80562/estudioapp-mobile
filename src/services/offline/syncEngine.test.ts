import { Capacitor } from '@capacitor/core';
import type { QueryClient } from '@tanstack/react-query';
import { OWN_PROFILE_QUERY_KEY } from '../../features/users/hooks/useOwnProfile';
import { useNetworkStore } from '../../store/networkStore';
import { useOutboxStore } from '../../store/outboxStore';
import { updateOwnProfile } from '../api/endpoints/users';
import { BusinessRuleError, type AppClientError } from '../api/errorMapper';
import { computeNextAttempt, isRetryableError, MAX_AUTO_ATTEMPTS } from './retryPolicy';
import type { OutboxIntentRow, OwnProfileOutboxInput } from './outboxTypes';
import * as outboxRepository from './outboxRepository';

/**
 * Refresca el estado global de la tienda outbox consultando el intent activo actual en la base de datos local.
 */
const syncStoreWithDb = async (): Promise<void> => {
  const active = await outboxRepository.getActiveIntent();
  useOutboxStore.setState({ intent: active });
};

/**
 * Encola un nuevo intento de actualización de perfil propio (o actualiza el existente por coalescencia),
 * persistiendo el registro en SQLite y reflejándolo inmediatamente en el store global.
 */
export const enqueueOwnProfileIntent = async (input: OwnProfileOutboxInput): Promise<OutboxIntentRow> => {
  const intent = await outboxRepository.upsertOwnProfileIntent(input);
  await syncStoreWithDb();
  return intent;
};

/**
 * Descartar un conflicto (opción del usuario de conservar la versión del servidor):
 * elimina físicamente la fila pendiente de la base de datos y limpia el store.
 */
export const resolveConflictDiscard = async (): Promise<void> => {
  const active = await outboxRepository.getActiveIntent();
  if (!active) return;
  await outboxRepository.deleteIntent(active.id);
  await syncStoreWithDb();
};

/**
 * Resuelve un conflicto sobrescribiendo con los cambios locales del usuario:
 * vuelve a poner el intent en estado 'pending' actualizando su timestamp de expectativa.
 */
export const resolveConflictKeepLocal = async (expectedProfileUpdatedAt: string): Promise<void> => {
  const active = await outboxRepository.getActiveIntent();
  if (!active) return;
  await outboxRepository.resetToPending(active.id, expectedProfileUpdatedAt);
  await syncStoreWithDb();
};

/**
 * Motor central de sincronización offline para la bandeja de salida (outbox).
 * Procesa los intents pendientes respetando restricciones de conectividad, plataforma nativa,
 * políticas de reintento exponencial y manejo explícito de conflictos (409).
 */
export const processOwnProfileOutbox = async (queryClient: QueryClient): Promise<void> => {
  // 1. Verificación de plataforma nativa y conectividad
  if (!Capacitor.isNativePlatform()) return;

  const isOnline = useNetworkStore.getState().isOnline;
  if (!isOnline) {
    await syncStoreWithDb();
    return;
  }

  // Evita ejecuciones concurrentes si ya se encuentra sincronizando
  if (useOutboxStore.getState().isSyncing) return;

  // 2. Obtener el siguiente intent que deba procesarse según su programación o estado
  const dueIntent = await outboxRepository.getDueIntent();
  if (!dueIntent) {
    await syncStoreWithDb();
    return;
  }

  useOutboxStore.setState({ isSyncing: true });
  await outboxRepository.markSyncing(dueIntent.id);
  await syncStoreWithDb();

  try {
    // 3. Ejecución de la solicitud remota hacia el backend
    const updatedProfile = await updateOwnProfile({
      phone: dueIntent.phone,
      facebookUrl: dueIntent.facebookUrl,
      instagramUrl: dueIntent.instagramUrl,
      linkedinUrl: dueIntent.linkedinUrl,
      xUrl: dueIntent.xUrl,
      githubUrl: dueIntent.githubUrl,
      tiktokUrl: dueIntent.tiktokUrl,
      websiteUrl: dueIntent.websiteUrl,
      expectedProfileUpdatedAt: dueIntent.expectedProfileUpdatedAt,
    });

    // 4. Éxito: limpiar el intent de la base de datos y actualizar la caché de React Query
    await outboxRepository.markSynced(dueIntent.id);
    queryClient.setQueryData(OWN_PROFILE_QUERY_KEY, updatedProfile);
    useOutboxStore.setState({ justSynced: true, isSyncing: false, intent: null });
  } catch (err) {
    const error = err as AppClientError;
    const errorCode = error.code ?? 'UNKNOWN_ERROR';
    const errorMessage = error.message;

    // 5. Manejo específico de Conflictos (HTTP 409 / BusinessRuleError)
    if (error instanceof BusinessRuleError) {
      await outboxRepository.markConflict(dueIntent.id, errorMessage);
      await queryClient.invalidateQueries({ queryKey: OWN_PROFILE_QUERY_KEY });
      useOutboxStore.setState({ isSyncing: false });
      await syncStoreWithDb();
      return;
    }

    // 6. Evaluación de errores reintentables vs terminales
    if (isRetryableError(error) && dueIntent.attemptCount < MAX_AUTO_ATTEMPTS) {
      const nextAttemptCount = dueIntent.attemptCount + 1;
      const { nextAttemptAt } = computeNextAttempt(dueIntent.attemptCount);

      await outboxRepository.markRetryScheduled(
        dueIntent.id,
        nextAttemptCount,
        nextAttemptAt,
        errorCode,
        errorMessage,
      );
      useOutboxStore.setState({ isSyncing: false });
      await syncStoreWithDb();
    } else {
      // Se agotaron los intentos automáticos o el error es de tipo terminal
      await outboxRepository.markTerminalError(dueIntent.id, errorCode, errorMessage);
      useOutboxStore.setState({ isSyncing: false });
      await syncStoreWithDb();
    }
  }
};