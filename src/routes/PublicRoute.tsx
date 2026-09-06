import type { ComponentProps } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSession } from '../features/auth/hooks/useSession';

type PublicRouteProps = ComponentProps<typeof Route>;

/**
 * Componente de ruta pública (como la pantalla de inicio de sesión o registro).
 * Verifica si el usuario ya cuenta con una sesión activa y válida:
 * - Redirige automáticamente al panel de administración (/admin) si ya está autenticado,
 *   evitando que vuelva a ver vistas públicas innecesarias.
 * - Permite visualizar el contenido público si no hay una sesión iniciada.
 */
const PublicRoute: React.FC<PublicRouteProps> = ({ children, ...routeProps }) => {
  // Consulta si la sesión actual se ha cargado y es exitosa
  const { isSuccess } = useSession();

  // Si el usuario ya está autenticado, lo redirige directamente al panel principal /admin
  if (isSuccess) {
    return (
      <Route {...routeProps}>
        <Redirect to="/admin" />
      </Route>
    );
  }

  // Renderiza el componente público (ejemplo: Login o Registro) si no hay sesión activa
  return <Route {...routeProps}>{children}</Route>;
};

export default PublicRoute;