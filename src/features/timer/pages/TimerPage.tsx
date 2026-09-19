import React from 'react';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from '@ionic/react';
import { TimerDisplay } from '../components/TimerDisplay';
import { SessionControls } from '../components/SessionControls';
import { useTimer, TimerMode } from '../hooks/useTimer';
import '../timer.css'; // Importa los estilos que definimos

export const TimerPage: React.FC = () => {
  const {
    mode,
    formattedTime,
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    changeMode,
  } = useTimer();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cronómetro Pomodoro</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '15px' }}>
          
          {/* Segmento para cambiar entre modos de estudio y descanso */}
          <IonSegment
            value={mode}
            onIonChange={(e) => changeMode(e.detail.value as TimerMode)}
            style={{ marginBottom: '20px', maxWidth: '380px' }}
          >
            <IonSegmentButton value="work">
              <IonLabel>Estudio</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="shortBreak">
              <IonLabel>Descanso</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="longBreak">
              <IonLabel>Pausa Larga</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          {/* Componente visual del reloj */}
          <TimerDisplay formattedTime={formattedTime} mode={mode} />

          {/* Componente de botones de control */}
          <SessionControls
            isRunning={isRunning}
            onStart={startTimer}
            onPause={pauseTimer}
            onReset={resetTimer}
          />

        </div>
      </IonContent>
    </IonPage>
  );
};

export default TimerPage;