import { Capacitor } from '@capacitor/core';
import { Network } from '@capacitor/network';
import type { QueryClient } from '@tanstack/react-query';
import { useNetworkStore } from '../../store/networkStore';
import { loadActiveOutboxIntent, processOwnProfileOutbox } from './syncEngine';

let initialized = false;

/**
 * Inicializa el monitor de red de la aplicación.
 * Se invoca una única vez desde App.tsx para mantener actualizado el estado global de red
 * (networkStore) y disparar la sincronización automática del outbox cuando el dispositivo
 * recupera la conexión (transición de offline a online), sin requerir intervención del usuario.
 */
export const initNetworkMonitor = async (queryClient: QueryClient): Promise<void> => {
  // Evita inicializaciones múltiples o ejecuciones en plataformas no nativas
  if (initialized || !Capacitor.isNativePlatform()) return;
  initialized = true;

  // Obtiene el estado inicial de la red y actualiza el store global
  const status = await Network.getStatus();
  useNetworkStore.getState().setOnline(status.connected);

  // Escucha los cambios en la conectividad del dispositivo en tiempo real
  Network.addListener('networkStatusChange', status => {
    const wasOnline = useNetworkStore.getState().isOnline;
    useNetworkStore.getState().setOnline(status.connected);
    
    // Si el dispositivo pasa de estar desconectado a conectado, procesa la sincronización automáticamente
    if (!wasOnline && status.connected) {
      void processOwnProfileOutbox(queryClient);
    }
  });

  // Carga el intent activo almacenado localmente
  await loadActiveOutboxIntent();
  
  // Si la aplicación arranca con conexión a internet, ejecuta la sincronización inicial
  if (status.connected) {
    void processOwnProfileOutbox(queryClient);
  }
};

/**
 * Restablece el estado del monitor exclusivamente para fines de pruebas unitarias,
 * permitiendo reejecutar la inicialización en entornos de test.
 */
export const resetNetworkMonitorForTests = (): void => {
  initialized = false;
};