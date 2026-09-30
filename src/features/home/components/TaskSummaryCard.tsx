import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonText, IonButton } from '@ionic/react';

interface TaskSummaryCardProps {
  pendingCount: number;
  onViewTasks: () => void;
}

export const TaskSummaryCard: React.FC<TaskSummaryCardProps> = ({ pendingCount, onViewTasks }) => {
  return (
    <IonCard style={{ borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', margin: '16px' }}>
      <IonCardHeader>
        <IonCardTitle style={{ fontSize: '1.2rem', color: '#1e293b' }}>Resumen de Tareas</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonText color="medium">
          <p>Tienes <strong>{pendingCount}</strong> tareas pendientes por entregar esta semana.</p>
        </IonText>
        <div style={{ marginTop: '12px' }}>
          <IonButton fill="outline" color="primary" size="small" onClick={onViewTasks}>
            Ver todas las tareas
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};