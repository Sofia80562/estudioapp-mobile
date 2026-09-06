import { IonItem, IonLabel, IonList, IonSkeletonText } from '@ionic/react';

interface AppSkeletonProps {
  rows?: number;
}

/**
 * Componente que renderiza un indicador de carga en forma de esqueletos (placeholder)
 * estructurado con filas de texto simuladas para mantener la fluidez visual durante la carga.
 */
export const AppSkeleton: React.FC<AppSkeletonProps> = ({ rows = 5 }) => (
  <IonList role="status" aria-label="Cargando información" className="app-skeleton">
    {Array.from({ length: rows }, (_, index) => (
      <IonItem key={index} lines="full" aria-hidden="true">
        <IonLabel>
          <IonSkeletonText animated style={{ width: '60%' }} />
          <IonSkeletonText animated style={{ width: '40%' }} />
        </IonLabel>
      </IonItem>
    ))}
  </IonList>
);

export default AppSkeleton;