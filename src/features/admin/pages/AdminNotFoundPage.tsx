import { helpCircleOutline } from 'ionicons/icons';
import AppStateMessage from '../../../components/layout/AppStateMessage';

/**
 * Página de error 404 para rutas administrativas no encontradas,
 * guiando al usuario de regreso mediante el menú de navegación.
 */
const AdminNotFoundPage: React.FC = () => (
  <AppStateMessage
    icon={helpCircleOutline}
    role="alert"
    eyebrow="Ruta no disponible"
    title="Esta sección administrativa no existe"
    description="Usa el menú para volver a uno de los módulos habilitados para tu cuenta."
    titleId="admin-not-found-title"
  />
);

export default AdminNotFoundPage;