import React, { useEffect, useState } from 'react';
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

export const ProfileSummary: React.FC<ProfileSummaryProps> = ({ user }) => {
  const history = useHistory();
  const profile = useOwnProfile();
  const avatar = useOwnAvatar(Boolean(profile.data?.hasAvatar), profile.data?.avatarUpdatedAt);
  const visibleLinks = SOCIAL_LINKS.filter(item => Boolean(profile.data?.[item.field]));
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!avatar.data) {
      setAvatarUrl(null);
      return;
    }
    const url = URL.createObjectURL(avatar.data);
    setAvatarUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [avatar.data]);

  return (
    <section className="profile-summary" aria-labelledby="profile-title" style={{ background: '#fff', borderRadius: '16px', padding: '16px', margin: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <AppAvatar name={user.name} src={avatarUrl} className="profile-summary__avatar" />
      <div className="profile-summary__identity" style={{ marginTop: '10px' }}>
        <p className="profile-summary__label" style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>Estudiante / Cuenta</p>
        <h2 id="profile-title" style={{ margin: '4px 0', fontSize: '1.2rem', color: '#1e293b' }}>{user.name}</h2>
        <IonButton fill="clear" size="small" onClick={() => history.push('/admin/profile')} style={{ padding: 0, height: 'auto' }}>
          Editar perfil
        </IonButton>
      </div>

      <div className="profile-summary__contact" aria-label="Información de contacto" style={{ margin: '12px 0' }}>
        <a href={`mailto:${user.email}`} className="profile-summary__contact-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4f46e5', textDecoration: 'none', fontSize: '0.9rem' }}>
          <IonIcon icon={mailOutline} aria-hidden="true" />
          <span>{user.email}</span>
        </a>
        {profile.data?.phone && (
          <a href={`tel:${profile.data.phone}`} className="profile-summary__contact-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4f46e5', textDecoration: 'none', fontSize: '0.9rem', marginTop: '6px' }}>
            <IonIcon icon={callOutline} aria-hidden="true" />
            <span>{profile.data.phone}</span>
          </a>
        )}
      </div>

      {visibleLinks.length > 0 && (
        <nav className="profile-summary__social" aria-label="Redes sociales y enlaces" style={{ display: 'flex', gap: '10px', margin: '12px 0' }}>
          {visibleLinks.map(item => (
            <a
              key={item.field}
              href={profile.data?.[item.field] ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Abrir ${item.label}`}
              title={item.label}
              style={{ color: '#4f46e5', fontSize: '1.2rem' }}
            >
              <IonIcon icon={item.icon || linkOutline} aria-hidden="true" />
            </a>
          ))}
        </nav>
      )}

      <div className="profile-summary__roles" aria-label="Roles asignados" style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px' }}>
        {user.roles.length > 0 ? (
          user.roles.map(role => <IonChip key={role.id} style={{ margin: 0 }}>{role.name}</IonChip>)
        ) : (
          <p className="profile-summary__empty" style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>Aún no tienes roles asignados.</p>
        )}
      </div>
    </section>
  );
};

export default ProfileSummary;