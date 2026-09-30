/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_BASE_URL_ANDROID?: string;
  readonly VITE_API_BASE_URL_IOS?: string;
  readonly VITE_API_TIMEOUT_MS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Declaración global para permitir la importación de archivos CSS como efectos secundarios
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}