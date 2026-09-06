import type { ComponentProps } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonSpinner } from '@ionic/react';
import { useSession } from '../features/auth/hooks/useSession';

type ProtectedRouteProps = ComponentProps<typeof Route>;

/**
 * Componente de ruta protegida general de la aplicación.
 * Valida el estado de la sesión activa del usuario:
 * - Muestra un indicador de carga mientras se verifica la autenticación.
 * - Redirige a la pantalla de inicio de sesión si la sesión no es válida o hay un error.
 * - Renderiza el contenido protegido si el usuario está autenticado.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, ...routeProps }) => {
  // Consulta el estado actual de la sesión del usuario mediante el hook correspondiente
  const { isPending, isError } = useSession();

  // Muestra un indicador de carga (spinner) mientras se valida la sesión con el servidor
  if (isPending) {
    return (
      <Route {...routeProps}>
        <IonSpinner name="dots" />
      </Route>
    );
  }

  // Redirige al usuario al login si la sesión ha expirado o no es válida
  if (isError) {
    return (
      <Route {...routeProps}>
        <Redirect to="/login" />
      </Route>
    );
  }

  // Permite el acceso a la ruta protegida si la sesión es correcta
  return <Route {...routeProps}>{children}</Route>;
};

export default ProtectedRoute;