import { useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { useHistory } from 'react-router-dom';
import { IonButton, IonRouterLink } from '@ionic/react';
import AppButton from '../../../components/common/AppButton';
import AppPage from '../../../components/layout/AppPage';
import { redirectToLogin } from '../../../services/api/endpoints/auth';
import { AppClientError, BusinessRuleError, ValidationError } from '../../../services/api/errorMapper';
import type { RegisterAccountType, RegisterResponse } from '../../../types/api/register';
import type { ManagerRegisterFormValues, PlayerRegisterFormValues } from '../../../validation/register';
import AccountTypeStep from '../components/AccountTypeStep';
import AuthShell from '../components/AuthShell';
import ManagerRegisterForm from '../components/ManagerRegisterForm';
import StudentRegisterForm from '../components/StudentRegisterForm';
import { useRegisterMutation } from '../hooks/useRegister';
import '../pages/login-page.css';
import './register-page.css';

const mapRegisterError = (error: unknown): string => {
  if (error instanceof AppClientError && error.httpStatus === 429) {
    return 'Demasiados intentos. Espera un momento e inténtalo de nuevo.';
  }

  if (error instanceof BusinessRuleError) {
    return error.message;
  }

  if (error instanceof ValidationError) {
    return error.details?.[0]?.message ?? error.message;
  }

  return 'No se pudo completar el registro. Intenta de nuevo.';
};

const RegisterPage: React.FC = () => {
  const history = useHistory();
  const [accountType, setAccountType] = useState<RegisterAccountType | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<RegisterResponse | null>(null);
  const registerMutation = useRegisterMutation();

  const goToLogin = (email: string): void => {
    if (Capacitor.isNativePlatform()) {
      history.push('/login', { email });
      return;
    }

    redirectToLogin();
  };

  const handlePlayerSubmit = async (values: PlayerRegisterFormValues): Promise<void> => {
    setSubmitError(null);

    try {
      const response = await registerMutation.mutateAsync({ ...values, accountType: 'estudiante' as any });
      setResult(response);
    } catch (error) {
      setSubmitError(mapRegisterError(error));
    }
  };

  const handleManagerSubmit = async (values: ManagerRegisterFormValues): Promise<void> => {
    setSubmitError(null);

    try {
      const response = await registerMutation.mutateAsync({ ...values, accountType: 'institucion' as any });
      setResult(response);
    } catch (error) {
      setSubmitError(mapRegisterError(error));
    }
  };

  if (result) {
    return (
      <AppPage title="Cuenta creada" showHeader={false}>
        <AuthShell
          title="¡Cuenta creada!"
          description="Ya puedes iniciar sesión con tu correo y tu contraseña."
        >
          <AppButton expand="block" onClick={() => goToLogin(result.user.email)}>
            Ir a iniciar sesión
          </AppButton>
        </AuthShell>
      </AppPage>
    );
  }

  return (
    <AppPage title="Crear cuenta en EstudioApp" showHeader={false}>
      <AuthShell
        title={accountType ? 'Crea tu cuenta' : '¿Cómo quieres usar EstudioApp?'}
        description={
          accountType
            ? 'Completa tus datos para organizar tus metas académicas.'
            : 'Elige el tipo de cuenta que necesitas.'
        }
      >
        {!accountType && <AccountTypeStep onSelect={setAccountType} />}
        {accountType && <StudentRegisterForm onSubmit={handlePlayerSubmit} submitError={submitError} />}

        {accountType && (
          <IonButton
            type="button"
            fill="clear"
            size="small"
            className="register-page__back"
            onClick={() => {
              setAccountType(null);
              setSubmitError(null);
            }}
          >
            ← Elegir otro tipo de cuenta
          </IonButton>
        )}

        <p className="auth-shell__privacy">
          ¿Ya tienes cuenta? <IonRouterLink routerLink="/login">Inicia sesión</IonRouterLink>
        </p>
      </AuthShell>
    </AppPage>
  );
};

export default RegisterPage;