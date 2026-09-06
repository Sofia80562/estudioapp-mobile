import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, type SQLiteDBConnection } from '@capacitor-community/sqlite';

/**
 * Instancia global de la conexión SQLite para el manejo de la bandeja de salida offline (outbox).
 */
const sqlite = new SQLiteConnection(CapacitorSQLite);
let db: SQLiteDBConnection | null = null;

/**
 * Obtiene o inicializa la conexión con la base de datos SQLite local.
 * Valida que se esté ejecutando en una plataforma nativa (iOS/Android), ya que
 * el almacenamiento local SQLite mediante Capacitor no está disponible en la web.
 */
export const getOutboxDb = async (): Promise<SQLiteDBConnection> => {
  // Verifica si la aplicación corre en una plataforma nativa compatible
  if (!Capacitor.isNativePlatform()) {
    throw new Error('La base de datos offline solo está disponible en la app nativa.');
  }

  // Retorna la instancia existente si ya se encuentra abierta
  if (db) {
    return db;
  }

  // Crea y abre la conexión con la base de datos local para la sincronización offline
  db = await sqlite.createConnection(
    'estudioapp_outbox',
    false,
    'no-encryption',
    1,
    false,
  );

  await db.open();
  return db;
};