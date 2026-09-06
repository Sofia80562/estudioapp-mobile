import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  AuthenticationError,
  AuthorizationError,
  BusinessRuleError,
  NetworkError,
  ServerError,
  TimeoutError,
  ValidationError,
} from '../api/errorMapper';
import { computeNextAttempt, isRetryableError, MAX_AUTO_ATTEMPTS } from './retryPolicy';

/**
 * Pruebas unitarias para la política de reintentos (retryPolicy) de la sincronización offline.
 * Evalúa la clasificación de errores y el cálculo del tiempo de retroceso (backoff exponencial con jitter).
 */
describe('services/offline/retryPolicy', () => {
  describe('isRetryableError', () => {
    /**
     * Verifica que los errores de red, tiempos de espera agotados y errores del servidor
     * se consideren reintentables automáticamente.
     */
    it('treats network, timeout and server errors as retryable', () => {
      expect(isRetryableError(new NetworkError('offline'))).toBe(true);
      expect(isRetryableError(new TimeoutError('slow'))).toBe(true);
      expect(isRetryableError(new ServerError('boom'))).toBe(true);
    });

    /**
     * Comprueba que los errores de conflicto, validación, autenticación y autorización
     * se traten como terminales (no reintentables automáticamente).
     */
    it('treats conflict, validation and auth errors as terminal (not retryable)', () => {
      expect(isRetryableError(new BusinessRuleError('conflict'))).toBe(false);
      expect(isRetryableError(new ValidationError('bad input'))).toBe(false);
      expect(isRetryableError(new AuthenticationError('no session'))).toBe(false);
      expect(isRetryableError(new AuthorizationError('forbidden'))).toBe(false);
    });
  });

  describe('computeNextAttempt', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'));
    });

    afterEach(() => {
      vi.useRealTimers();
      vi.restoreAllMocks();
    });

    /**
     * Asegura que el retraso calculado nunca supere el límite máximo de 5 minutos,
     * incluso al alcanzar el número máximo de intentos automáticos.
     */
    it('never exceeds the 5 minute cap even at the max attempt count', () => {
      vi.spyOn(Math, 'random').mockReturnValue(1 - Number.EPSILON);
      const { delayMs } = computeNextAttempt(MAX_AUTO_ATTEMPTS);
      expect(delayMs).toBeLessThanOrEqual(5 * 60_000);
    });

    /**
     * Valida que el tiempo de espera aumente conforme incrementa el número de intentos
     * (implementación de backoff exponencial).
     */
    it('grows with the attempt count (exponential backoff)', () => {
      vi.spyOn(Math, 'random').mockReturnValue(1 - Number.EPSILON);
      const first = computeNextAttempt(0).delayMs;
      const second = computeNextAttempt(1).delayMs;
      const third = computeNextAttempt(2).delayMs;
      expect(second).toBeGreaterThan(first);
      expect(third).toBeGreaterThan(second);
    });

    /**
     * Comprueba que la marca de tiempo en formato ISO devuelta coincida exactamente
     * con la suma del tiempo actual y el retraso calculado.
     */
    it('returns an ISO timestamp consistent with the computed delay', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.5);
      const { delayMs, nextAttemptAt } = computeNextAttempt(0);
      expect(new Date(nextAttemptAt).getTime()).toBe(Date.now() + delayMs);
    });

    /**
     * Verifica que el algoritmo permita un retraso de cero (gracias al jitter completo)
     * para permitir reintentos inmediatos bajo condiciones específicas.
     */
    it('can return zero delay (full jitter allows immediate retry)', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0);
      const { delayMs } = computeNextAttempt(3);
      expect(delayMs).toBe(0);
    });
  });
});