import React, { useState } from 'react';
import { IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonButtons } from '@ionic/react';
import AppButton from '../common/AppButton';
import './TaskModal.css';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskData: { title: string; description: string; priority: string; dueDate: string }) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({ title, description, priority, dueDate });
    setTitle('');
    setDescription('');
    setDueDate('');
    onClose();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Nueva Tarea / Estudio</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>Cerrar</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem style={{ marginBottom: '16px' }}>
          <IonLabel position="stacked">Título de la Tarea</IonLabel>
          <IonInput value={title} placeholder="Ej: Proyecto de Redes" onIonChange={e => setTitle(e.detail.value!)} />
        </IonItem>

        <IonItem style={{ marginBottom: '16px' }}>
          <IonLabel position="stacked">Descripción</IonLabel>
          <IonTextarea value={description} placeholder="Detalles o pasos a seguir..." onIonChange={e => setDescription(e.detail.value!)} />
        </IonItem>

        <IonItem style={{ marginBottom: '16px' }}>
          <IonLabel position="stacked">Fecha de Entrega</IonLabel>
          <IonInput type="date" value={dueDate} onIonChange={e => setDueDate(e.detail.value!)} />
        </IonItem>

        <div style={{ padding: '16px 0' }}>
          <AppButton color="primary" onClick={handleSave} className="ion-margin-top">
            Guardar Tarea
          </AppButton>
        </div>
      </IonContent>
    </IonModal>
  );
};