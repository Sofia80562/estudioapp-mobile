import { useEffect, useState } from 'react';

/**
 * Hook genérico para retrasar la actualización de un valor (debounce),
 * reutilizable en componentes con listados y búsquedas para optimizar el rendimiento.
 */
export const useDebounce = <T>(value: T, delayMs = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(timeout);
  }, [value, delayMs]);

  return debouncedValue;
};