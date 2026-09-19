import React from 'react';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonButton,
  IonSpinner,
  IonIcon,
} from '@ionic/react';
import { bulbOutline } from 'ionicons/icons';
import { useAiAssistant } from '../hooks/useAiAssistant';
import './ai-assistant.css';

export const AiAssistantPage: React.FC = () => {
  const { advice, loading, fetchAiAdvice } = useAiAssistant();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Asistente IA de Estudio</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="ai-container">
          <IonCard className="ai-card">
            <IonCardContent className="ion-text-center">
              <div className="ai-icon-wrapper">
                <IonIcon icon={bulbOutline} color="primary" className="ai-main-icon" />
              </div>
              <h2>Consejo Inteligente</h2>
              
              {loading ? (
                <div style={{ margin: '30px 0' }}>
                  <IonSpinner name="crescent" color="primary" />
                  <p style={{ color: 'var(--ion-color-medium)', marginTop: '10px' }}>Analizando tu productividad...</p>
                </div>
              ) : (
                <p className="ai-advice-text">{advice}</p>
              )}

              <IonButton
                expand="block"
                shape="round"
                color="primary"
                onClick={fetchAiAdvice}
                disabled={loading}
                style={{ marginTop: '20px' }}
              >
                {loading ? 'Generando...' : 'Obtener Consejo'}
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AiAssistantPage;