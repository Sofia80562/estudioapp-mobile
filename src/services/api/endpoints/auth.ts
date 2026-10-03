import { apiClient } from '../apiClient';
import { env } from '../../../config/env';
import type { ApiSuccessEnvelope } from '../../../types/api/common';
import type { MobileTokenResponse, SessionUser } from '../../../types/api/auth';

export const buildLoginUrl = (): string => `${env.apiBaseUrl}/auth/login`;

export const redirectToLogin = (): void => {
    window.location.assign(buildLoginUrl());
};

export const getSession = async (): Promise<SessionUser> => {
    const { data } = await apiClient.get<ApiSuccessEnvelope<SessionUser>>('/auth/session');
    return data.data;
};

export const refreshSession = async (): Promise<void> => {
    await apiClient.post('/auth/refresh');
};

export const logout = async (): Promise<void> => {
    await apiClient.post('/auth/logout');
};

/**
 * Autenticación nativa por formulario (usuario/contraseña), procesada de forma local por el backend contra PostgreSQL.
 */
export const loginWithPassword = async (username: string, password: string): Promise<MobileTokenResponse> => {
    const { data } = await apiClient.post<ApiSuccessEnvelope<MobileTokenResponse>>('/auth/mobile/login', {
        username,
        password,
    });
    return data.data;
};