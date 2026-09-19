import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonList,
  IonText,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import { useTasks } from '../hooks/useTasks';
import { TaskCard } from '../components/TaskCard';
import { TaskFormModal } from '../components/TaskFormModal';
import '../tasks.css';

export const TasksPage: React.FC = () => {
  const { tasks, addTask, toggleCompleteTask, deleteTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis Tareas</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsModalOpen(true)}>
              <IonIcon slot="icon-only" icon={add} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {tasks.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <IonText color="medium">
              <p>No tienes tareas pendientes. ¡Agrega una nueva!</p>
            </IonText>
          </div>
        ) : (
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={toggleCompleteTask}
                onDelete={deleteTask}
              />
            ))}
          </div>
        )}

        {/* Modal para crear tareas */}
        <TaskFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={addTask}
        />
      </IonContent>
    </IonPage>
  );
};

export default TasksPage;