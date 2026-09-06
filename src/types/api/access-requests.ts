import type { PaginationMeta } from './common';

/**
 * Representación de la sede asociada a una solicitud de acceso dentro de la organización.
 */
export interface AccessRequestOrganizationVenue {
  id: string;
  name: string;
  status: string;
}

/**
 * Representación de la organización involucrada en una solicitud de acceso.
 */
export interface AccessRequestOrganization {
  id: string;
  name: string;
  status: string;
  venues: AccessRequestOrganizationVenue[];
}

/**
 * Datos del usuario solicitante asociados a una petición de acceso.
 */
export interface AccessRequestRequester {
  id: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
  };
}

/**
 * Objeto de transferencia de datos (DTO) que describe una solicitud de acceso completa.
 */
export interface AccessRequestDto {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  reviewedAt: string | null;
  rejectionReason: string | null;
  organization: AccessRequestOrganization;
  requester: AccessRequestRequester;
}

/**
 * Parámetros de consulta para listar solicitudes de acceso con paginación y filtro por estado.
 */
export interface AccessRequestListQuery {
  page?: number;
  pageSize?: number;
  status?: AccessRequestDto['status'];
}

/**
 * Estructura de respuesta paginada para los listados de solicitudes de acceso.
 */
export interface AccessRequestListResponse {
  data: AccessRequestDto[];
  meta: PaginationMeta;
}

/**
 * Respuesta obtenida al aprobar exitosamente una solicitud de acceso.
 */
export interface ApproveAccessRequestResponse {
  organizationId: string;
  status: AccessRequestDto['status'];
}

/**
 * Respuesta obtenida al rechazar exitosamente una solicitud de acceso.
 */
export interface RejectAccessRequestResponse {
  requestId: string;
  status: AccessRequestDto['status'];
}