import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IonRouterLink } from '@ionic/react';
import AppButton from '../../../components/common/AppButton';
import AppInteractionAlert from '../../../components/feedback/AppInteractionAlert';
import AppInput from '../../../components/forms/AppInput';
import AppPage from '../../../components/layout/AppPage';
import { register } from '../../../services/api/endpoints/register';
import { BusinessRuleError } from '../../../services/api/errorMapper';
import { logger } from '../../../services/telemetry/logger';
import { 
  playerRegisterFormSchema, 
  managerRegisterFormSchema, 
  type PlayerRegisterFormValues, 
  type ManagerRegisterFormValues 
} from '../../../validation/register';
import AuthShell from '../components/AuthShell';
import './register-page.css';

type AccountType = 'estudiante' | 'organizador';

const RegisterPage: React.FC = () => {
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ type: AccountType; email: string } | null>(null);

  // Seleccionamos dinámicamente el esquema de Zod según el tipo de cuenta elegido
  const currentSchema = accountType === 'organizador' ? managerRegisterFormSchema : playerRegisterFormSchema;

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<PlayerRegisterFormValues | ManagerRegisterFormValues>({
    resolver: zodResolver(currentSchema as any),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: any): Promise<void> => {
    setSubmitError(null);
    if (!accountType) return;

    try {
      await register({
        accountType,
        ...values,
      });
      setSuccessData({ type: accountType, email: values.email });
    } catch (error) {
      const message =
        error instanceof BusinessRuleError
          ? error.message
          : 'No se pudo completar el registro. Intenta de nuevo.';
      logger.warn('Registro fallido', { accountType });
      setSubmitError(message);
    }
  };

  if (successData) {
    return (
      <AppPage title="Registro exitoso" showHeader={false}>
        <AuthShell title="¡Cuenta creada!" description="Tu registro en EstudioApp se ha completado con éxito.">
          <div className="auth-success-box">
            <p>Ya puedes iniciar sesión con tu correo y tu contraseña.</p>
          </div>
          <AppButton expand="block" routerLink="/login" className="ion-margin-top">
            Ir a iniciar sesión
          </AppButton>
        </AuthShell>
      </AppPage>
    );
  }

  if (!accountType) {
    return (
      <AppPage title="Selecciona tu perfil" showHeader={false}>
        <AuthShell title="Elige tu tipo de cuenta" description="Selecciona cómo deseas utilizar EstudioApp.">
          <div className="account-type-grid">
            <AppButton expand="block" fill="outline" onClick={() => setAccountType('estudiante')}>
              Estudiante y metas académicas
            </AppButton>
            <AppButton expand="block" fill="outline" onClick={() => setAccountType('organizador')}>
              Gestionar grupos o sedes
            </AppButton>
          </div>
        </AuthShell>
      </AppPage>
    );
  }

  return (
    <AppPage title="Crear cuenta en EstudioApp" showHeader={false}>
      <AuthShell title="Crear cuenta" description="Ingresa tus datos personales para registrarte.">
        <button
          type="button"
          className="back-button-link"
          onClick={() => {
            setAccountType(null);
            setSubmitError(null);
          }}
          style={{ background: 'none', border: 'none', color: 'var(--ion-color-primary)', cursor: 'pointer', padding: 0, marginBottom: '16px' }}
        >
          ← Elegir otro tipo de cuenta
        </button>

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name="firstName"
            control={control}
            render={({ field, fieldState }) => (
              <AppInput
                label="Nombre"
                value={field.value}
                disabled={isSubmitting}
                error={fieldState.error?.message}
                onIonInput={event => field.onChange(event.detail.value)}
                onIonBlur={field.onBlur}
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            render={({ field, fieldState }) => (
              <AppInput
                label="Apellido"
                value={field.value}
                disabled={isSubmitting}
                error={fieldState.error?.message}
                onIonInput={event => field.onChange(event.detail.value)}
                onIonBlur={field.onBlur}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <AppInput
                label="Correo electrónico"
                type="email"
                value={field.value}
                disabled={isSubmitting}
                error={fieldState.error?.message}
                onIonInput={event => field.onChange(event.detail.value)}
                onIonBlur={field.onBlur}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <AppInput
                label="Contraseña"
                type="password"
                value={field.value}
                disabled={isSubmitting}
                error={fieldState.error?.message}
                onIonInput={event => field.onChange(event.detail.value)}
                onIonBlur={field.onBlur}
              />
            )}
          />

          <AppInteractionAlert
            isOpen={Boolean(submitError)}
            kind="error"
            header="Error en el registro"
            message={submitError ?? ''}
            onDismiss={() => setSubmitError(null)}
          />

          <AppButton expand="block" type="submit" isLoading={isSubmitting}>
            Registrarse
          </AppButton>
        </form>

        <p className="auth-shell__privacy">
          ¿Ya tienes una cuenta? <IonRouterLink routerLink="/login">Inicia sesión</IonRouterLink>
        </p>
      </AuthShell>
    </AppPage>
  );
};

export default RegisterPage;