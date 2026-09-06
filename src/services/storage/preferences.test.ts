import { Preferences } from '@capacitor/preferences';

/**
 * Recupera un valor almacenado en las preferencias locales de Capacitor utilizando su clave.
 */
export const getPreference = async (key: string): Promise<string | null> => {
  const result = await Preferences.get({ key });
  return result.value;
};

/**
 * Guarda un valor en las preferencias locales de Capacitor, aplicando una salvaguarda de seguridad
 * para impedir el almacenamiento de información sensible o credenciales en texto plano.
 */
export const setPreference = async (key: string, value: string): Promise<void> => {
  const lowerKey = key.toLowerCase();
  const sensitivePatterns = ['auth', 'secret', 'password', 'token', 'session'];

  const isSensitive = sensitivePatterns.some(pattern => lowerKey.includes(pattern));

  if (isSensitive) {
    throw new Error('No se permite almacenar datos potencialmente sensibles o tokens en las preferencias sin cifrar.');
  }

  await Preferences.set({ key, value });
};

/**
 * Elimina una clave específica de las preferencias locales.
 */
export const removePreference = async (key: string): Promise<void> => {
  await Preferences.remove({ key });
};

/**
 * Borra por completo todas las preferencias almacenadas localmente en el dispositivo.
 */
export const clearAllPreferences = async (): Promise<void> => {
  await Preferences.clear();
};