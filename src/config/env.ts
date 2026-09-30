import { Capacitor } from '@capacitor/core';

// Declaración global para forzar a TypeScript a reconocer import.meta.env
declare global {
  interface ImportMeta {
    env: {
      VITE_API_BASE_URL?: string;
      VITE_API_BASE_URL_ANDROID?: string;
      VITE_API_BASE_URL_IOS?: string;
      VITE_API_TIMEOUT_MS?: string | number;
      [key: string]: any;
    };
  }
}

interface AppEnv {
  apiBaseUrl: string;
  apiTimeoutMs: number;
}

interface ApiBaseUrlSources {
  platform: string;
  base?: string;
  android?: string;
  ios?: string;
}

const requireEnv = (key: string, value: string | undefined): string => {
  if (!value) {
    throw new Error(`${key} no está definida. Revisa tu archivo .env (ver .env.example).`);
  }
  return value;
};

export const resolveApiBaseUrl = ({ platform, base, android, ios }: ApiBaseUrlSources): string => {
  const byPlatform = platform === 'android' ? android : platform === 'ios' ? ios : undefined;
  return requireEnv('VITE_API_BASE_URL', byPlatform || base);
};

const readEnv = (): AppEnv => ({
  apiBaseUrl: resolveApiBaseUrl({
    platform: Capacitor.getPlatform(),
    base: import.meta.env.VITE_API_BASE_URL,
    android: import.meta.env.VITE_API_BASE_URL_ANDROID,
    ios: import.meta.env.VITE_API_BASE_URL_IOS,
  }),
  apiTimeoutMs: Number(import.meta.env.VITE_API_TIMEOUT_MS ?? 15000),
});

export const env = readEnv();