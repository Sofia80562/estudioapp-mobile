import React, { useState } from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonLabel,
} from '@ionic/react';
import type { CreateSubjectDto, SubjectDto } from '../hooks/useSubjects';

interface SubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateSubjectDto) => Promise<void>;
  initialData?: SubjectDto | null;
}

export const SubjectModal: React.FC<SubjectModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [professor, setProfessor] = useState(initialData?.professor || '');
  const [credits, setCredits] = useState(initialData?.credits ? String(initialData.credits) : '3');
  const [status, setStatus] = useState<'ACTIVE' | 'COMPLETED' | 'ARCHIVED'>(initialData?.status || 'ACTIVE');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !professor.trim()) return;

    try {
      setIsSubmitting(true);
      await onSave({
        name,
        professor,
        credits: Number(credits),
        status,
      });
      onClose();
    } catch (error) {
      console.error('Error al guardar materia:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>{initialData ? 'Editar Materia' : 'Nueva Materia'}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>Cancelar</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
          <IonItem>
            <IonInput
              label="Nombre de la Materia"
              labelPlacement="stacked"
              value={name}
              onIonChange={e => setName(e.detail.value!)}
              required
              placeholder="Ej. Arquitectura de Software"
            />
          </IonItem>

          <IonItem>
            <IonInput
              label="Profesor / Docente"
              labelPlacement="stacked"
              value={professor}
              onIonChange={e => setProfessor(e.detail.value!)}
              required
              placeholder="Ej. Ing. Juan Pérez"
            />
          </IonItem>

          <IonItem>
            <IonInput
              label="Créditos"
              labelPlacement="stacked"
              type="number"
              value={credits}
              onIonChange={e => setCredits(e.detail.value!)}
              required
              min="1"
              max="10"
            />
          </IonItem>

          <IonItem>
            <IonSelect
              label="Estado de la materia"
              labelPlacement="stacked"
              value={status}
              onIonChange={e => setStatus(e.detail.value)}
            >
              <IonSelectOption value="ACTIVE">En Curso</IonSelectOption>
              <IonSelectOption value="COMPLETED">Aprobada / Finalizada</IonSelectOption>
              <IonSelectOption value="ARCHIVED">Archivada</IonSelectOption>
            </IonSelect>
          </IonItem>

          <div style={{ marginTop: '20px' }}>
            <IonButton expand="block" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : 'Guardar Materia'}
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonModal>
  );
};