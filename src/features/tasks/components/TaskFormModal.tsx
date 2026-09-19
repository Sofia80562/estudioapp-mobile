import React, { useState } from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonButtons,
} from '@ionic/react';
import { TaskItem } from './TaskCard';

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskData: Omit<TaskItem, 'id' | 'completed'>) => void;
}

export const TaskFormModal: React.FC<TaskFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({ title, description, priority });
    setTitle('');
    setDescription('');
    setPriority('medium');
    onClose();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Nueva Tarea</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>Cancelar</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem style={{ marginBottom: '15px' }}>
          <IonInput
            label="Título de la tarea"
            labelPlacement="stacked"
            placeholder="Ej. Estudiar Ionic y Capacitor"
            value={title}
            onIonInput={(e) => setTitle(e.detail.value!)}
          />
        </IonItem>

        <IonItem style={{ marginBottom: '15px' }}>
          <IonTextarea
            label="Descripción (opcional)"
            labelPlacement="stacked"
            placeholder="Detalles o apuntes importantes..."
            value={description}
            onIonInput={(e) => setDescription(e.detail.value!)}
          />
        </IonItem>

        <IonItem style={{ marginBottom: '25px' }}>
          <IonSelect
            label="Prioridad"
            labelPlacement="stacked"
            value={priority}
            onIonChange={(e) => setPriority(e.detail.value)}
          >
            <IonSelectOption value="low">Baja</IonSelectOption>
            <IonSelectOption value="medium">Media</IonSelectOption>
            <IonSelectOption value="high">Alta</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonButton expand="block" color="primary" onClick={handleSave}>
          Guardar Tarea
        </IonButton>
      </IonContent>
    </IonModal>
  );
};