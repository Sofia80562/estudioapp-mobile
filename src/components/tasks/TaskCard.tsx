import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonText } from '@ionic/react';
import { AppBadge } from '../common/AppBadge';

interface TaskCardProps {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  onClick?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  priority,
  dueDate,
  onClick,
}) => {
  const getBadgeColor = (p: string) => {
    switch (p) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      default: return 'success';
    }
  };

  return (
    <IonCard onClick={onClick} style={{ cursor: 'pointer', borderRadius: '12px', margin: '8px 0' }}>
      <IonCardHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <IonCardTitle style={{ fontSize: '1.1rem' }}>{title}</IonCardTitle>
        <AppBadge color={getBadgeColor(priority)}>{priority.toUpperCase()}</AppBadge>
      </IonCardHeader>
      <IonCardContent>
        <IonText color="medium">
          <p>{description}</p>
        </IonText>
        <IonText color="dark" style={{ fontSize: '0.85rem', display: 'block', marginTop: '8px' }}>
          <strong>Entrega:</strong> {dueDate}
        </IonText>
      </IonCardContent>
    </IonCard>
  );
};