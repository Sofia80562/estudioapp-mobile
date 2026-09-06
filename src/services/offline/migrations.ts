import type { capSQLiteVersionUpgrade } from '@capacitor-community/sqlite';

// Nombre de la base de datos offline actualizado al dominio de EstudioApp
export const OUTBOX_DB_NAME = 'estudioapp_offline';
export const OUTBOX_DB_VERSION = 1;

/**
 * Definición de migraciones para la base de datos local SQLite de sincronización (outbox).
 * Nota de diseño (forward-only): nunca editar una entrada ya publicada ni hacer DROP+CREATE
 * para evolucionar el esquema. Para cambios futuros, agregar un nuevo objeto con el siguiente
 * número de versión al final del array.
 */
export const OUTBOX_MIGRATIONS: capSQLiteVersionUpgrade[] = [
  {
    toVersion: 1,
    statements: [
      // Tabla de intents offline para la sincronización de perfiles de usuario
      `CREATE TABLE IF NOT EXISTS outbox_own_profile_intent (
        id                        TEXT PRIMARY KEY NOT NULL,
        status                    TEXT NOT NULL CHECK (status IN ('pending','syncing','synced','error','conflict')),
        phone                     TEXT,
        facebook_url              TEXT,
        instagram_url             TEXT,
        linkedin_url              TEXT,
        x_url                     TEXT,
        github_url                TEXT,
        tiktok_url                TEXT,
        website_url               TEXT,
        expected_profile_updated_at TEXT NOT NULL,
        attempt_count             INTEGER NOT NULL DEFAULT 0,
        next_attempt_at           TEXT,
        last_error_code           TEXT,
        last_error_message        TEXT,
        created_at                TEXT NOT NULL,
        updated_at                TEXT NOT NULL
      );`,
      // Índice para optimizar consultas de reintentos según el estado y la fecha programada
      `CREATE INDEX IF NOT EXISTS idx_outbox_status_next_attempt
        ON outbox_own_profile_intent (status, next_attempt_at);`,
    ],
  },
];