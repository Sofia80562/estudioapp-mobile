import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';

interface AppCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const AppCard: React.FC<AppCardProps> = ({
  title,
  children,
  className = '',
  onClick,
}) => {
  return (
    <IonCard className={`app-card ${className}`} onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      {title && (
        <IonCardHeader style={{ paddingBottom: '8px' }}>
          <IonCardTitle style={{ fontSize: '1.15rem', fontWeight: '600' }}>
            {title}
          </IonCardTitle>
        </IonCardHeader>
      )}
      <IonCardContent style={{ paddingTop: title ? '0px' : '16px' }}>
        {children}
      </IonCardContent>
    </IonCard>
  );
};