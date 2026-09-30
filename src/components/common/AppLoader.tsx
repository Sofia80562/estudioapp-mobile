import React from 'react';
import { IonSpinner, IonText } from '@ionic/react';

interface AppLoaderProps {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
}

export const AppLoader: React.FC<AppLoaderProps> = ({
  message = 'Cargando...',
  size = 'large',
  color = 'primary',
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px', width: '100%' }}>
      <IonSpinner name="crescent" color={color} style={{ width: size === 'large' ? '48px' : '24px', height: size === 'large' ? '48px' : '24px' }} />
      {message && (
        <IonText color="medium" style={{ marginTop: '12px', fontSize: '0.9rem', fontWeight: '500' }}>
          <p>{message}</p>
        </IonText>
      )}
    </div>
  );
};