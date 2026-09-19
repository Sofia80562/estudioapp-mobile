import React from 'react';
import { IonCard, IonCardContent } from '@ionic/react';

interface TimerDisplayProps {
  formattedTime: string;
  mode: 'work' | 'shortBreak' | 'longBreak';
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ formattedTime, mode }) => {
  const getModeLabel = () => {
    switch (mode) {
      case 'work':
        return 'Momento de concentrarse';
      case 'shortBreak':
        return 'Tiempo de descanso corto';
      case 'longBreak':
        return 'Pausa larga merecida';
    }
  };

  return (
    <IonCard className="timer-card">
      <IonCardContent className="ion-text-center">
        <h1 className="timer-clock">{formattedTime}</h1>
        <p className="timer-subtitle">{getModeLabel()}</p>
      </IonCardContent>
    </IonCard>
  );
};