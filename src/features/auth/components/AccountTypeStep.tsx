import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import { businessOutline, chevronForwardOutline, schoolOutline } from 'ionicons/icons';
import type { RegisterAccountType } from '../../../types/api/register';

interface AccountTypeStepProps {
  onSelect: (accountType: RegisterAccountType) => void;
}

const AccountTypeStep: React.FC<AccountTypeStepProps> = ({ onSelect }) => (
  <div className="account-type-step" role="group" aria-label="¿Cómo quieres usar EstudioApp?">
    <IonItem button detail={false} lines="none" className="account-type-card" onClick={() => onSelect('estudiante')}>
      <span slot="start" className="account-type-card__icon" aria-hidden="true">
        <IonIcon icon={schoolOutline} />
      </span>
      <IonLabel className="account-type-card__copy">
        <strong>Estudiante y metas académicas</strong>
        <small>Organiza tus materias, notas y progreso educativo.</small>
      </IonLabel>
      <IonIcon slot="end" icon={chevronForwardOutline} className="account-type-card__arrow" aria-hidden="true" />
    </IonItem>

    <IonItem button detail={false} lines="none" className="account-type-card" onClick={() => onSelect('organizador')}>
      <span slot="start" className="account-type-card__icon" aria-hidden="true">
        <IonIcon icon={businessOutline} />
      </span>
      <IonLabel className="account-type-card__copy">
        <strong>Gestionar grupos o sedes</strong>
        <small>Registra tu organización y tus espacios de estudio.</small>
      </IonLabel>
      <IonIcon slot="end" icon={chevronForwardOutline} className="account-type-card__arrow" aria-hidden="true" />
    </IonItem>
  </div>
);

export default AccountTypeStep;