import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonText, IonBadge, IonButton, IonIcon } from '@ionic/react';
import { createOutline } from 'ionicons/icons';
import type { SubjectDto } from '../hooks/useSubjects';
import { SUBJECT_STATUS_LABELS } from '../subjectStatus';

interface SubjectCardProps {
  subject: SubjectDto;
  onEdit?: (subject: SubjectDto) => void;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onEdit }) => {
  return (
    <IonCard className="subject-card" style={{ borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', margin: '16px' }}>
      <IonCardHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IonCardTitle style={{ fontSize: '1.2rem', color: '#1e293b' }}>{subject.name}</IonCardTitle>
          <IonBadge color={subject.status === 'ACTIVE' ? 'success' : 'medium'}>
            {SUBJECT_STATUS_LABELS[subject.status]}
          </IonBadge>
        </div>
      </IonCardHeader>
      <IonCardContent>
        <IonText color="medium">
          <p style={{ margin: '0 0 6px 0' }}>Profesor: <strong>{subject.professor}</strong></p>
          <p style={{ margin: 0 }}>Créditos académicos: <strong>{subject.credits}</strong></p>
        </IonText>
        {onEdit && (
          <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'flex-end' }}>
            <IonButton fill="outline" size="small" onClick={() => onEdit(subject)}>
              <IonIcon slot="start" icon={createOutline} />
              Editar Materia
            </IonButton>
          </div>
        )}
      </IonCardContent>
    </IonCard>
  );
};