import { Switch } from 'react-router-dom';
import AdminRoute from '../../../routes/AdminRoute';
import UserDetailPage from './UserDetailPage';
import UserFormPage from './UserFormPage';
import UserProfileEditPage from './UserProfileEditPage';
import UsersListPage from './UsersListPage';

/**
 * Enrutador interno del módulo de gestión de usuarios.
 * Configura las rutas protegidas para listar, crear, editar y ver detalles de perfiles,
 * asegurando el orden correcto de las rutas estáticas antes de las dinámicas en React Router.
 */
const UsersModule: React.FC = () => (
  <Switch>
    <AdminRoute exact path="/admin/users" requiredPermissions={['users.read']}>
      <UsersListPage />
    </AdminRoute>
    <AdminRoute exact path="/admin/users/new" requiredPermissions={['users.create']}>
      <UserFormPage mode="create" />
    </AdminRoute>
    <AdminRoute exact path="/admin/users/:userId/edit" requiredPermissions={['users.update']}>
      <UserProfileEditPage />
    </AdminRoute>
    <AdminRoute exact path="/admin/users/:userId" requiredPermissions={['users.read']}>
      <UserDetailPage />
    </AdminRoute>
  </Switch>
);

export default UsersModule;