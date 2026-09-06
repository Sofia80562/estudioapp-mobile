import type { PaginationMeta } from './common';

/**
 * Representación de una organización en el sistema, conteniendo sus datos legales,
 * de contacto y metadatos de auditoría.
 */
export interface OrganizationDto {
  id: string;
  name: string;
  legalName: string | null;
  taxIdentification: string | null;
  email: string | null;
  phone: string | null;
  domain: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  venuesCount?: number;
}

/**
 * Resumen básico de la organización, utilizado en selectores o pickers de otros módulos.
 */
export type OrganizationSummary = Pick<OrganizationDto, 'id' | 'name'>;

/**
 * Parámetros de consulta y filtrado para el listado de organizaciones.
 */
export interface OrganizationListQuery {
  page?: number;
  pageSize?: number;
  search?: string;
  orderBy?: 'name' | 'createdAt';
  order?: 'asc' | 'desc';
}

/**
 * Estructura de la respuesta cruda devuelta por el endpoint de organizaciones del backend.
 */
export interface OrganizationListRawResponse {
  organizations: OrganizationDto[];
  meta: PaginationMeta;
}

/**
 * Estructura normalizada de la respuesta para el listado de organizaciones.
 */
export interface OrganizationListResponse {
  data: OrganizationDto[];
  meta: PaginationMeta;
}

/**
 * Datos requeridos para registrar una nueva organización en el sistema.
 */
export interface CreateOrganizationRequest {
  name: string;
  legalName?: string;
  taxIdentification?: string;
  email?: string;
  phone?: string;
  domain?: string;
}

/**
 * Datos requeridos para actualizar una organización existente, incluyendo el sello de control de concurrencia.
 */
export interface UpdateOrganizationRequest extends Partial<CreateOrganizationRequest> {
  expectedUpdatedAt: string;
}

/**
 * Representación de una sede (Venue) asociada a una organización.
 */
export interface VenueDto {
  id: string;
  organizationId: string;
  name: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Parámetros de consulta para listar las sedes de una organización de forma paginada y filtrada.
 */
export interface VenueListQuery {
  page?: number;
  pageSize?: number;
  search?: string;
  orderBy?: 'name' | 'createdAt';
  order?: 'asc' | 'desc';
}

/**
 * Estructura de la respuesta cruda devuelta por el endpoint de sedes del backend.
 */
export interface VenueListRawResponse {
  venues: VenueDto[];
  meta: PaginationMeta;
}

/**
 * Estructura normalizada de la respuesta para el listado de sedes.
 */
export interface VenueListResponse {
  data: VenueDto[];
  meta: PaginationMeta;
}

/**
 * Datos requeridos para crear una nueva sede dentro de una organización.
 */
export interface CreateVenueRequest {
  name: string;
  address?: string;
  phone?: string;
  email?: string;
}

/**
 * Datos requeridos para actualizar una sede existente, incluyendo control de concurrencia.
 */
export interface UpdateVenueRequest extends Partial<CreateVenueRequest> {
  expectedUpdatedAt: string;
}