import type { UpdateOwnUserProfileRequest } from '../../types/api/users';

/**
 * Estados posibles en los que puede encontrarse un registro (intent) dentro de la bandeja de salida offline (outbox).
 */
export type OutboxStatus = 'pending' | 'syncing' | 'synced' | 'error' | 'conflict';

/**
 * Snapshot completo de los campos de contacto (no un diff parcial).
 * Esto evita ambigüedades entre un campo "no tocado" y uno "vaciado a null",
 * manteniendo el mismo comportamiento que envía OwnProfilePage.tsx en el flujo en línea.
 */
export type OwnProfileOutboxInput = UpdateOwnUserProfileRequest;

/**
 * Representación en TypeScript de una fila en la tabla `outbox_own_profile_intent`
 * (correspondencia 1:1 con las columnas definidas en services/offline/migrations.ts).
 */
export interface OutboxIntentRow {
  id: string;
  status: OutboxStatus;
  phone: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  linkedinUrl: string | null;
  xUrl: string | null;
  githubUrl: string | null;
  tiktokUrl: string | null;
  websiteUrl: string | null;
  expectedProfileUpdatedAt: string;
  attemptCount: number;
  nextAttemptAt: string | null;
  lastErrorCode: string | null;
  lastErrorMessage: string | null;
  createdAt: string;
  updatedAt: string;
}