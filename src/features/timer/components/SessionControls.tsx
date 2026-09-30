import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { playOutline, pauseOutline, refreshOutline } from 'ionicons/icons';

interface SessionControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export const SessionControls: React.FC<SessionControlsProps> = ({ isRunning, onStart, onPause, onReset }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '20px' }}>
      {!isRunning ? (
        <IonButton color="success" onClick={onStart} shape="round">
          <IonIcon slot="start" icon={playOutline} />
          Iniciar
        </IonButton>
      ) : (
        <IonButton color="warning" onClick={onPause} shape="round">
          <IonIcon slot="start" icon={pauseOutline} />
          Pausar
        </IonButton>
      )}

      <IonButton color="medium" fill="outline" onClick={onReset} shape="round">
        <IonIcon slot="start" icon={refreshOutline} />
        Reiniciar
      </IonButton>
    </div>
  );
};