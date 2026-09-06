import { useEffect, useState } from 'react';
import { IonButton, IonChip, IonIcon } from '@ionic/react';
import {
  callOutline,
  globeOutline,
  linkOutline,
  logoFacebook,
  logoGithub,
  logoInstagram,
  logoLinkedin,
  logoTiktok,
  logoTwitter,
  mailOutline,
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import AppAvatar from '../../../components/common/AppAvatar';
import { useOwnAvatar, useOwnProfile } from '../../users/hooks/useOwnProfile';
import type { SessionUser } from '../../../types/api/auth';
import type { OwnUserProfileDto } from '../../../types/api/users';

interface ProfileSummaryProps {
  user: SessionUser;
}

const SOCIAL_LINKS = [
  { field: 'facebookUrl', label: 'Facebook', icon: logoFacebook },
  { field: 'instagramUrl', label: 'Instagram', icon: logoInstagram },
  { field: 'linkedinUrl', label: 'LinkedIn', icon: logoLinkedin },
  { field: 'xUrl', label: 'X / Twitter', icon: logoTwitter },
  { field: 'githubUrl', label: 'GitHub', icon: logoGithub },
  { field: 'tiktokUrl', label: 'TikTok', icon: logoTiktok },
  { field: 'websiteUrl', label: 'Sitio web', icon: globeOutline },
] as const;

/**
 * Componente que muestra un resumen de la cuenta del usuario autenticado,
 * incluyendo avatar, datos de contacto, enlaces de redes sociales y roles asignados.
 */
const ProfileSummary: React.FC<ProfileSummaryProps> = ({ user }) => {
  const history = useHistory();
  const profile = useOwnProfile();
  const profileData = profile.data as OwnUserProfileDto | undefined;
  const avatar = useOwnAvatar(Boolean(profileData?.hasAvatar), profileData?.avatarUpdatedAt);
  const visibleLinks = SOCIAL_LINKS.filter(item => Boolean(profileData?.[item.field]));
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!avatar.data) {
      setAvatarUrl(null);
      return;
    }
    const url = URL.createObjectURL(avatar.data as Blob);
    setAvatarUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [avatar.data]);

  return (
    <section className="profile-summary" aria-labelledby="profile-title">
      <AppAvatar name={user.name} src={avatarUrl} className="profile-summary__avatar" />
      <div className="profile-summary__identity">
        <p className="profile-summary__label">Tu cuenta</p>
        <h2 id="profile-title">{user.name}</h2>
        <IonButton fill="clear" size="small" onClick={() => history.push('/admin/profile')}>
          Completar perfil
        </IonButton>
      </div>
      <div className="profile-summary__contact" aria-label="Información de contacto">
        <a href={`mailto:${user.email}`} className="profile-summary__contact-item">
          <IonIcon icon={mailOutline} aria-hidden="true" />
          <span>{user.email}</span>
        </a>
        {profileData?.phone && (
          <a href={`tel:${profileData.phone}`} className="profile-summary__contact-item">
            <IonIcon icon={callOutline} aria-hidden="true" />
            <span>{profileData.phone}</span>
          </a>
        )}
      </div>
      {visibleLinks.length > 0 && (
        <nav className="profile-summary__social" aria-label="Redes sociales y enlaces">
          {visibleLinks.map(item => (
            <a
              key={item.field}
              href={profileData?.[item.field] ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Abrir ${item.label}`}
              title={item.label}
            >
              <IonIcon icon={item.icon || linkOutline} aria-hidden="true" />
            </a>
          ))}
        </nav>
      )}
      <div className="profile-summary__roles" aria-label="Roles asignados">
        {user.roles.length > 0 ? (
          user.roles.map(role => <IonChip key={role.id}>{role.name}</IonChip>)
        ) : (
          <p className="profile-summary__empty">Aún no tienes roles asignados.</p>
        )}
      </div>
    </section>
  );
};

export default ProfileSummary;