import React from 'react';
import { IonText } from '@ionic/react';

interface TimerDisplayProps {
  formattedTime: string;
  isRunning: boolean;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ formattedTime, isRunning }) => {
  return (
    <div style={{ padding: '20px 0' }}>
      <IonText color="primary">
        <h1 className="timer-display-text">{formattedTime}</h1>
      </IonText>
      <IonText color="medium">
        <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 500 }}>
          {isRunning ? '🔥 Sesión de estudio en curso...' : '⏸️ Cronómetro en pausa'}
        </p>
      </IonText>
    </div>
  );
};