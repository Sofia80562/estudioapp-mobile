import React from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';

// Importa las páginas principales de tu app de productividad
import { TasksPage } from '../features/tasks/pages/TasksPage';
import { TimerPage } from '../features/timer/pages/TimerPage';
import { AiAssistantPage } from '../features/ai/pages/AiAssistantPage';
import MainTabsLayout from './MainTabsLayout';

setupIonicReact();

export const AppShell: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* Ruta principal que maneja las pestañas de navegación inferiores */}
          <Route path="/app" component={MainTabsLayout} />

          {/* Redirección inicial hacia el módulo principal */}
          <Route exact path="/">
            <Redirect to="/app/tasks" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default AppShell;