import { Capacitor } from '@capacitor/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Simula el comportamiento del módulo @capacitor/core para controlar la plataforma (nativa o web)
vi.mock('@capacitor/core', () => ({
  Capacitor: { isNativePlatform: vi.fn() },
}));

// Simula las dependencias nativas de SQLite para evitar errores en entornos de prueba (Node.js)
vi.mock('@capacitor-community/sqlite', () => ({
  CapacitorSQLite: {},
  SQLiteConnection: vi.fn().mockImplementation(() => ({
    addUpgradeStatement: vi.fn(),
    isConnection: vi.fn(),
    createConnection: vi.fn(),
    retrieveConnection: vi.fn(),
  })),
}));

describe('services/offline/db', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  /**
   * Prueba unitaria para verificar que la base de datos offline rechaza explícitamente
   * su inicialización en plataformas no nativas (como navegadores web), arrojando el error esperado.
   */
  it('rejects explicitly on non-native platforms instead of trying to open SQLite', async () => {
    // Configura el mock para simular una plataforma web (no nativa)
    vi.mocked(Capacitor.isNativePlatform).mockReturnValue(false);
    
    // Importa de forma dinámica el módulo de base de datos tras configurar el mock
    const { getOutboxDb } = await import('./db');
    
    // Verifica que la función falle y lance el mensaje de error correspondiente
    await expect(getOutboxDb()).rejects.toThrow(/solo está disponible en la app nativa/);
  });
});