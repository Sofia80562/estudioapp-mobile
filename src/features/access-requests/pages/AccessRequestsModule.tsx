import { Switch } from 'react-router-dom';
import AdminRoute from '../../../routes/AdminRoute';
import AccessRequestsPage from './AccessRequestsPage';

const AccessRequestsModule: React.FC = () => (
  <Switch>
    <AdminRoute exact path="/admin/organizations/access-requests" requiredPermissions={['organizaciones.manage']}>
      <AccessRequestsPage />
    </AdminRoute>
  </Switch>
);

export default AccessRequestsModule;