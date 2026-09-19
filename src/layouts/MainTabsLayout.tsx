import React from 'react';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { checkboxOutline, timeOutline, bulbOutline } from 'ionicons/icons';

// Importaciones de páginas
import { TasksPage } from '../features/tasks/pages/TasksPage';
import { TimerPage } from '../features/timer/pages/TimerPage';
import { AiAssistantPage } from '../features/ai/pages/AiAssistantPage';

const MainTabsLayout: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/app/tasks" component={TasksPage} />
        <Route exact path="/app/timer" component={TimerPage} />
        <Route exact path="/app/ai" component={AiAssistantPage} />
        
        <Route exact path="/app">
          <Redirect to="/app/tasks" />
        </Route>
      </IonRouterOutlet>

      {/* Barra de navegación inferior */}
      <IonTabBar slot="bottom">
        <IonTabButton tab="tasks" href="/app/tasks">
          <IonIcon icon={checkboxOutline} />
          <IonLabel>Tareas</IonLabel>
        </IonTabButton>

        <IonTabButton tab="timer" href="/app/timer">
          <IonIcon icon={timeOutline} />
          <IonLabel>Pomodoro</IonLabel>
        </IonTabButton>

        <IonTabButton tab="ai" href="/app/ai">
          <IonIcon icon={bulbOutline} />
          <IonLabel>Asistente IA</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabsLayout;