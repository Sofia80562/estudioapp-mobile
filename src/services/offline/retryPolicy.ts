import { NetworkError, ServerError, TimeoutError, type AppClientError } from '../api/errorMapper';

/**
 * Determina si un error es reintentable de forma automática, basándose exclusivamente
 * en las clases del módulo de errores (plan.md §Motor de reintentos).
 * Es fail-safe por defecto: cualquier error no contemplado explícitamente se considera terminal.
 */
export const isRetryableError = (error: AppClientError): boolean =>
  error instanceof NetworkError || error instanceof TimeoutError || error instanceof ServerError;

const BASE_DELAY_MS = 5_000; // 5 segundos de retraso base
const MAX_DELAY_MS = 5 * 60_000; // 5 minutos de límite máximo
export const MAX_AUTO_ATTEMPTS = 8;

/**
 * Calcula el siguiente intento de sincronización utilizando backoff exponencial
 * con "full jitter" (patrón AWS), evitando que múltiples dispositivos intenten
 * reconectarse simultáneamente y sobresaturen el servidor.
 */
export const computeNextAttempt = (attemptCount: number): { delayMs: number; nextAttemptAt: string } => {
  const cap = Math.min(MAX_DELAY_MS, BASE_DELAY_MS * 2 ** attemptCount);
  const delayMs = Math.floor(Math.random() * cap);
  return { delayMs, nextAttemptAt: new Date(Date.now() + delayMs).toISOString() };
};