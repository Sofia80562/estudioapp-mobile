import React, { useState, useEffect } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonText, IonItem, IonLabel, IonInput } from '@ionic/react';
import AppButton from '../common/AppButton';
import './StudyTimerWidget.css';

interface StudyTimerWidgetProps {
  onSessionComplete?: (minutes: number) => void;
  onDeleteSession?: () => void;
}

export const StudyTimerWidget: React.FC<StudyTimerWidgetProps> = ({ onSessionComplete, onDeleteSession }) => {
  const [inputMinutes, setInputMinutes] = useState<number>(25); // Tiempo por defecto Pomodoro
  const [secondsRemaining, setSecondsRemaining] = useState<number>(25 * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isCustomizing, setIsCustomizing] = useState<boolean>(true);

  useEffect(() => {
    let interval: any = null;
    if (isActive && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && isActive) {
      setIsActive(false);
      alert('¡Tiempo de estudio completado! 🎯');
      if (onSessionComplete) onSessionComplete(inputMinutes);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsRemaining, inputMinutes, onSessionComplete]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(remainingSecs).padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    setIsCustomizing(false);
    setIsActive(!isActive);
  };

  const handleSetTime = (e: any) => {
    const mins = parseInt(e.detail.value, 10) || 0;
    setInputMinutes(mins);
    setSecondsRemaining(mins * 60);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsCustomizing(true);
    setSecondsRemaining(inputMinutes * 60);
  };

  return (
    <IonCard className="study-timer-card">
      <IonCardHeader>
        <IonCardTitle className="study-timer-title">Temporizador de Estudio (Pomodoro)</IonCardTitle>
      </IonCardHeader>
      <IonCardContent className="study-timer-content">
        
        {isCustomizing ? (
          <IonItem style={{ marginBottom: '16px', width: '100%' }}>
            <IonLabel position="stacked">Minutos de estudio deseados:</IonLabel>
            <IonInput 
              type="number" 
              value={inputMinutes} 
              onIonChange={handleSetTime} 
              min="1" 
              max="180"
            />
          </IonItem>
        ) : null}

        <IonText>
          <h1 className="study-timer-display">
            {formatTime(secondsRemaining)}
          </h1>
        </IonText>

        <div className="study-timer-actions">
          <AppButton color={isActive ? 'warning' : 'success'} onClick={handleStartPause}>
            {isActive ? 'Pausar' : 'Iniciar'}
          </AppButton>
          <AppButton color="medium" onClick={handleReset}>
            Reiniciar
          </AppButton>
          {onDeleteSession && (
            <AppButton color="danger" onClick={onDeleteSession}>
              Eliminar
            </AppButton>
          )}
        </div>
      </IonCardContent>
    </IonCard>
  );
};