import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent } from '@ionic/react';
import { useTimer } from '../hooks/useTimer';
import { TimerDisplay } from '../components/TimerDisplay';
import { SessionControls } from '../components/SessionControls';
import '../timer.css';

export const TimerPage: React.FC = () => {
  const { formattedTime, isRunning, start, pause, reset } = useTimer();

  return (
    <IonPage className="timer-page">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Temporizador Pomodoro</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard className="timer-card">
          <IonCardContent>
            <h2 style={{ color: '#1e293b', fontWeight: 'bold', margin: '0 0 10px 0' }}>Hora de Enfocarse</h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '10px' }}>
              Mantén el ritmo en tus materias y alcanza tus metas de estudio.
            </p>

            <TimerDisplay formattedTime={formattedTime} isRunning={isRunning} />

            <SessionControls
              isRunning={isRunning}
              onStart={start}
              onPause={pause}
              onReset={reset}
            />
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default TimerPage;