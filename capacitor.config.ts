import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ec.estudioapp.mobile',
  appName: 'EstudioApp',
  webDir: 'dist',
  server: {
    // Permite evitar bloqueos de Mixed Content al conectar con backends locales en http://
    androidScheme: 'http',
  },
};

export default config;