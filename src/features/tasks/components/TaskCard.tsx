import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonCheckbox,
  IonBadge,
} from '@ionic/react';
import { trash, create } from 'ionicons/icons';

export interface TaskItem {
  id: string | number;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
}

interface TaskCardProps {
  task: TaskItem;
  onToggleComplete: (id: string | number) => void;
  onDelete: (id: string | number) => void;
  onEdit?: (task: TaskItem) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggleComplete,
  onDelete,
  onEdit,
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
      default:
        return 'success';
    }
  };

  return (
    <IonCard className={`task-card ${task.completed ? 'completed-task' : ''}`}>
      <IonCardContent>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
            <IonCheckbox
              checked={task.completed}
              onIonChange={() => onToggleComplete(task.id)}
            />
            <div>
              <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none', margin: '0 0 5px 0', fontWeight: 'bold' }}>
                {task.title}
              </h3>
              {task.description && (
                <p style={{ margin: '0 0 8px 0', color: 'var(--ion-color-medium)', fontSize: '0.9rem' }}>
                  {task.description}
                </p>
              )}
              <IonBadge color={getPriorityColor(task.priority)} style={{ textTransform: 'uppercase', fontSize: '0.7rem' }}>
                {task.priority}
              </IonBadge>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '5px' }}>
            {onEdit && (
              <IonButton fill="clear" color="medium" onClick={() => onEdit(task)}>
                <IonIcon slot="icon-only" icon={create} />
              </IonButton>
            )}
            <IonButton fill="clear" color="danger" onClick={() => onDelete(task.id)}>
              <IonIcon slot="icon-only" icon={trash} />
            </IonButton>
          </div>

        </div>
      </IonCardContent>
    </IonCard>
  );
};