import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { useSessionStore } from '../store/sessionStore';
import AdminRoute from './AdminRoute';

afterEach(() => {
  useSessionStore.getState().clearSession();
});

describe('AdminRoute', () => {
  it('renders the destination when the effective permission is present', () => {
    useSessionStore.getState().setSession({
      id: 'user-1',
      email: 'student@example.com',
      name: 'Sofía',
      roles: [{ id: 'role-1', code: 'student-role', name: 'Student role' }],
      permissions: [{ id: 'permission-1', code: 'permisos.read' }],
    });

    render(
      <MemoryRouter initialEntries={['/admin/permissions']}>
        <AdminRoute path="/admin/permissions" requiredPermissions={['permisos.read']}>
          <p>Contenido autorizado</p>
        </AdminRoute>
      </MemoryRouter>,
    );

    expect(screen.getByText('Contenido autorizado')).toBeInTheDocument();
  });

  it('renders a safe denied state for a manually entered unauthorized URL', () => {
    useSessionStore.getState().setSession({
      id: 'user-1',
      email: 'student@example.com',
      name: 'Sofía',
      roles: [],
      permissions: [],
    });

    render(
      <MemoryRouter initialEntries={['/admin/permissions']}>
        <AdminRoute path="/admin/permissions" requiredPermissions={['permisos.read']}>
          <p>Contenido restringido</p>
        </AdminRoute>
      </MemoryRouter>,
    );

    expect(screen.queryByText('Contenido restringido')).not.toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('No tienes permiso');
  });

  it('requires every permission when requireAllPermissions is enabled', () => {
    useSessionStore.getState().setSession({
      id: 'user-1',
      email: 'student@example.com',
      name: 'Sofía',
      roles: [],
      permissions: [{ id: 'permission-1', code: 'roles.manage' }],
    });

    render(
      <MemoryRouter initialEntries={['/admin/roles/new']}>
        <AdminRoute
          path="/admin/roles/new"
          requiredPermissions={['roles.manage', 'permisos.read']}
          requireAllPermissions
        >
          <p>Formulario avanzado</p>
        </AdminRoute>
      </MemoryRouter>,
    );

    expect(screen.queryByText('Formulario avanzado')).not.toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('No tienes permiso');
  });
});