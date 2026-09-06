import type { PaginationMeta } from './common';

/**
 * Representación detallada de un rol asociado a un usuario en el sistema.
 */
export interface UserRoleDto {
  id: string;
  organizationId: string | null;
  code: string;
  name: string;
  description: string | null;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

/**
 * Representación completa de un usuario de la aplicación con sus roles y metadatos de estado.
 */
export interface UserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  active: boolean;
  roles: UserRoleDto[];
  createdAt: string;
  // Ausente en la respuesta de POST /api/users — presente en GET/PATCH.
  updatedAt?: string;
}

/**
 * Datos requeridos para crear un nuevo usuario dentro del sistema.
 */
export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  organizationId: string;
  roleIds?: string[];
}

/**
 * Datos opcionales para actualizar la información de un usuario existente.
 */
export type UpdateUserRequest = Partial<CreateUserRequest>;

/**
 * Parámetros de consulta y filtrado para listar usuarios con paginación y ordenamiento.
 */
export interface UserListQuery {
  page?: number;
  pageSize?: number;
  organizationId?: string;
  active?: true;
  search?: string;
  orderBy?: 'email' | 'createdAt';
  order?: 'asc' | 'desc';
}

/**
 * Estructura de respuesta paginada para los listados de usuarios.
 */
export interface UserListResponse {
  data: UserDto[];
  meta: PaginationMeta;
}

/**
 * Perfil administrativo de un usuario, conteniendo información personal y control de versiones.
 */
export interface AdminUserProfileDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  active: boolean;
  profileUpdatedAt: string;
}

/**
 * Solicitud de actualización para el perfil administrativo de un usuario.
 */
export interface UpdateAdminUserProfileRequest {
  firstName?: string;
  lastName?: string;
  expectedProfileUpdatedAt: string;
}

/**
 * Perfil de usuario propio con información de contacto, redes sociales y metadatos de avatar.
 */
export interface OwnUserProfileDto {
  phone: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  linkedinUrl: string | null;
  xUrl: string | null;
  githubUrl: string | null;
  tiktokUrl: string | null;
  websiteUrl: string | null;
  hasAvatar: boolean;
  avatarUpdatedAt: string | null;
  profileUpdatedAt: string;
}

/**
 * Campos editables disponibles en el perfil propio del usuario.
 */
export type OwnProfileField =
  | 'phone'
  | 'facebookUrl'
  | 'instagramUrl'
  | 'linkedinUrl'
  | 'xUrl'
  | 'githubUrl'
  | 'tiktokUrl'
  | 'websiteUrl';

/**
 * Solicitud de actualización para el perfil propio del usuario autenticado.
 */
export type UpdateOwnUserProfileRequest = Partial<Record<OwnProfileField, string | null>> & {
  expectedProfileUpdatedAt: string;
};

/**
 * Estructura de la petición para actualizar la imagen de avatar propia.
 */
export interface UpdateOwnAvatarRequest {
  imageBase64: string;
  mimeType: 'image/jpeg' | 'image/png' | 'image/webp';
}