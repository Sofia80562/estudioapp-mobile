import apiClient from '../apiClient';

export interface StudyAdviceResponse {
  advice: string;
}

// Endpoint para solicitar un consejo de estudio o análisis a la IA
export const getStudyAdvice = async (): Promise<StudyAdviceResponse> => {
  const response = await apiClient.get<StudyAdviceResponse>('/ai/study-advice');
  return response.data;
};