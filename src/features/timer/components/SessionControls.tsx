import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { play, pause, refresh } from 'ionicons/icons';

interface SessionControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export const SessionControls: React.FC<SessionControlsProps> = ({
  isRunning,
  onStart,
  onPause,
  onReset,
}) => {
  return (
    <div className="timer-controls">
      {!isRunning ? (
        <IonButton color="success" shape="round" onClick={onStart}>
          <IonIcon slot="icon-only" icon={play} />
        </IonButton>
      ) : (
        <IonButton color="warning" shape="round" onClick={onPause}>
          <IonIcon slot="icon-only" icon={pause} />
        </IonButton>
      )}
      <IonButton color="medium" fill="outline" shape="round" onClick={onReset}>
        <IonIcon slot="icon-only" icon={refresh} />
      </IonButton>
    </div>
  );
};