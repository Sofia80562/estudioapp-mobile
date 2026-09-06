import { create } from 'zustand';

/**
 * Estructura que representa a un usuario autenticado dentro del sistema.
 */
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  roles: Array<{ id: string; code: string; name: string }>;
  permissions: string[];
}

/**
 * Estados posibles en los que puede encontrarse la sesión del usuario.
 */
export type SessionStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated';

/**
 * Interfaz que define el estado y las acciones disponibles en el store de sesión.
 */
interface SessionState {
  status: SessionStatus;
  user: AuthUser | null;
  setSession: (user: AuthUser) => void;
  clearSession: () => void;
  setStatus: (status: SessionStatus) => void;
}

/**
 * Store global de Zustand encargado de gestionar la sesión del usuario actual,
 * controlando su estado de autenticación, perfil activo y limpieza de credenciales.
 */
export const useSessionStore = create<SessionState>(set => ({
  status: 'idle',
  user: null,

  setSession: user => {
    set({
      status: 'authenticated',
      user,
    });
  },

  clearSession: () => {
    set({
      status: 'unauthenticated',
      user: null,
    });
  },

  setStatus: status => {
    set({ status });
  },
}));