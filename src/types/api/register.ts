/**
 * Tipo de cuenta permitido durante el flujo de autorregistro en el sistema.
 */
export type RegisterAccountType = 'estudiante' | 'gestor-academico';

/**
 * Datos requeridos para la organización cuando el usuario se registra bajo un perfil administrativo o institucional.
 */
export interface RegisterOrganizationInput {
  name: string;
  legalName?: string;
  taxIdentification?: string;
  email?: string;
  phone?: string;
  domain?: string;
}

/**
 * Datos requeridos para la sede o sucursal asociada a la organización durante el autorregistro.
 */
export interface RegisterVenueInput {
  name: string;
  address?: string;
  phone?: string;
  email?: string;
}

/**
 * Campos base comunes para cualquier tipo de cuenta durante el proceso de registro.
 */
interface RegisterAccountFields {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

/**
 * Estructura discriminada de la petición de registro según el tipo de cuenta seleccionado.
 */
export type RegisterRequest =
  | (RegisterAccountFields & { accountType: 'estudiante' })
  | (RegisterAccountFields & {
      accountType: 'gestor-academico';
      organization: RegisterOrganizationInput;
      venue: RegisterVenueInput;
    });

/**
 * Información del usuario devuelta exitosamente tras completar el registro.
 */
interface RegisterResponseUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

/**
 * Estructura de la respuesta obtenida al procesar el autorregistro,
 * la cual no emite tokens de sesión inmediatos para requerir un inicio de sesión posterior.
 */
export type RegisterResponse =
  | { accountType: 'estudiante'; user: RegisterResponseUser }
  | {
      accountType: 'gestor-academico';
      user: RegisterResponseUser;
      accessRequestId: string;
      organizationStatus: 'PENDING_APPROVAL';
    };