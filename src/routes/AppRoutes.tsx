import { Redirect } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

/**
 * Componente principal de enrutamiento de la aplicación.
 * Define las rutas públicas (como login y registro) y las rutas protegidas,
 * además de redireccionar las rutas legacy o principales hacia el panel de administración (/admin).
 */
const AppRoutes: React.FC = () => (
  <IonRouterOutlet>
    {/* Ruta pública para el inicio de sesión */}
    <PublicRoute exact path="/login">
      <LoginPage />
    </PublicRoute>

    {/* Ruta pública para el registro de nuevos usuarios o administradores */}
    <PublicRoute exact path="/register">
      <RegisterPage />
    </PublicRoute>

    {/* Ruta protegida que agrupa todo el flujo administrativo y post-login bajo el layout principal */}
    <ProtectedRoute path="/admin">
      <AdminLayout />
    </ProtectedRoute>

    {/* Redirecciones de rutas antiguas o genéricas hacia la estructura unificada en /admin */}
    <Redirect exact from="/users/:userId/edit" to="/admin/users/:userId/edit" />
    <Redirect exact from="/users/:userId" to="/admin/users/:userId" />
    <Redirect exact from="/users" to="/admin/users" />
    <Redirect exact from="/home" to="/admin" />
    <Redirect exact from="/" to="/admin" />
  </IonRouterOutlet>
);

export default AppRoutes;