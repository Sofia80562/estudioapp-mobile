import type { ComponentProps } from 'react';
import { Route } from 'react-router-dom';
import { hasAnyPermission } from '../features/admin/navigation/admin-capabilities';
import AdminAccessDeniedPage from '../features/admin/pages/AdminAccessDeniedPage';
import { useSessionStore } from '../store/sessionStore';

interface AdminRouteProps extends ComponentProps<typeof Route> {
  requiredPermissions: string[];
  requireAllPermissions?: boolean;
}

/**
 * Componente de ruta protegida para el panel de administración.
 * Verifica si el usuario cuenta con los permisos requeridos (ya sea alguno o todos)
 * antes de renderizar la vista protegida, o muestra una pantalla de acceso denegado en caso contrario.
 */
const AdminRoute: React.FC<AdminRouteProps> = ({
  children,
  requiredPermissions,
  requireAllPermissions = false,
  ...routeProps
}) => {
  // Obtiene los permisos actuales del usuario desde la sesión global
  const permissions = useSessionStore(state => state.user?.permissions);
  
  // Evalúa si el usuario cumple con la condición de permisos (todos o al menos uno)
  const isAllowed = requireAllPermissions
    ? requiredPermissions.every(required => permissions?.some(permission => permission.code === required))
    : hasAnyPermission(permissions, requiredPermissions);

  return <Route {...routeProps}>{isAllowed ? children : <AdminAccessDeniedPage />}</Route>;
};

export default AdminRoute;