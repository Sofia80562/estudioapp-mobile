import { IonIcon } from '@ionic/react';
import { arrowForwardOutline, checkmarkDoneOutline, hourglassOutline } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import type { AdminNavigationGroup } from '../navigation/admin-navigation';
import AppButton from '../../../components/common/AppButton';
import AppStateMessage from '../../../components/layout/AppStateMessage';
import { useLogoutMutation } from '../../auth/hooks/useSession';
import ProfileSummary from '../../home/components/ProfileSummary';
import { useSessionStore } from '../../../store/sessionStore';

interface AdminDashboardPageProps {
  groups: AdminNavigationGroup[];
}

/**
 * Página principal del panel administrativo que centraliza la vista de inicio,
 * mostrando el resumen de perfil, cierre de sesión y módulos disponibles según los permisos del usuario.
 */
const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ groups }) => {
  const user = useSessionStore(state => state.user);
  const logoutMutation = useLogoutMutation();
  const items = groups.flatMap(group => group.items);
  // La mayoría de las cuentas no tienen módulos administrativos por defecto;
  // esto es parte de su condición normal de uso dentro de la aplicación.
  const hasAdminModules = items.length > 0;

  if (!user) {
    return (
      <AppStateMessage
        icon={hourglassOutline}
        eyebrow="Un momento"
        title="Verificando tu acceso"
        description="Estamos comprobando las capacidades de tu sesión."
      />
    );
  }

  return (
    <main className="admin-dashboard">
      <header className="admin-dashboard__hero">
        <p className="admin-state__eyebrow">{hasAdminModules ? 'Panel administrativo' : 'Tu cuenta'}</p>
        <h1>Hola, {user.name.split(' ')[0]}</h1>
        <p>
          {hasAdminModules
            ? 'Accede únicamente a las herramientas habilitadas para tu cuenta.'
            : 'Esta es la información de tu cuenta en EstudioApp.'}
        </p>
      </header>

      <ProfileSummary user={user} />

      {!hasAdminModules ? (
        <AppStateMessage
          icon={checkmarkDoneOutline}
          role="status"
          eyebrow="EstudioApp"
          title="Todo en orden"
          description="Por ahora no hay herramientas adicionales para tu cuenta. Vuelve pronto."
          titleId="admin-empty-title"
        />
      ) : (
        <section aria-labelledby="admin-modules-title">
          <div className="admin-dashboard__section-heading">
            <h2 id="admin-modules-title">Módulos disponibles</h2>
            <span>{items.length} disponibles</span>
          </div>
          <div className="admin-dashboard__grid">
            {items.map(item => (
              <Link key={item.id} to={item.path} className="admin-module-card">
                <span className="admin-module-card__icon" aria-hidden="true">
                  <IonIcon icon={item.icon} />
                </span>
                <span className="admin-module-card__copy">
                  <strong>{item.label}</strong>
                  <small>{item.description}</small>
                </span>
                <IonIcon className="admin-module-card__arrow" icon={arrowForwardOutline} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      )}

      <footer className="admin-dashboard__footer">
        <AppButton
          fill="outline"
          color="medium"
          isLoading={logoutMutation.isPending}
          onClick={() => logoutMutation.mutate()}
        >
          Cerrar sesión
        </AppButton>
      </footer>
    </main>
  );
};

export default AdminDashboardPage;