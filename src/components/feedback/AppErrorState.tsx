import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import { alertCircleOutline } from 'ionicons/icons';
import AppButton from '../common/AppButton';

interface AppErrorStateProps {
  message: string;
  onRetry?: () => void;
  isRetrying?: boolean;
}

/**
 * Componente que muestra un estado de error formateado para el usuario,
 * soportando opcionalmente un botón de reintento con indicador de carga.
 */
export const AppErrorState: React.FC<AppErrorStateProps> = ({ message, onRetry, isRetrying = false }) => (
  <IonItem className="app-error-state" lines="none" role="alert">
    <IonIcon icon={alertCircleOutline} slot="start" aria-hidden="true" />
    <IonLabel>
      <p>{message}</p>
      {onRetry && (
        <AppButton fill="outline" size="small" isLoading={isRetrying} onClick={onRetry}>
          Reintentar
        </AppButton>
      )}
    </IonLabel>
  </IonItem>
);

export default AppErrorState;