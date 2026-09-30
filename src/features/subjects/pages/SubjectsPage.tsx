import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonSpinner, IonText } from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import { useSubjects } from '../hooks/useSubjects';
import { SubjectCard } from '../components/SubjectCard';
import '../subjects.css';

export const SubjectsPage: React.FC = () => {
  const { subjects, isLoading, error } = useSubjects();

  return (
    <IonPage className="subjects-page">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Mis Materias</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/subjects/new">
              <IonIcon slot="icon-only" icon={addOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {isLoading && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
            <IonSpinner name="crescent" />
          </div>
        )}

        {error && (
          <IonText color="danger" style={{ padding: '20px', display: 'block', textAlign: 'center' }}>
            <p>Error al cargar las asignaturas.</p>
          </IonText>
        )}

        {!isLoading && !error && subjects.length === 0 && (
          <IonText color="medium" style={{ padding: '40px', display: 'block', textAlign: 'center' }}>
            <p>No tienes materias registradas todavía.</p>
          </IonText>
        )}

        {!isLoading && subjects.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default SubjectsPage;