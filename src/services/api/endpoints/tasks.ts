import apiClient from '../apiClient';

export interface TaskDto {
  id: string | number;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

// Obtener todas las tareas
export const getTasks = async (): Promise<TaskDto[]> => {
  const response = await apiClient.get<TaskDto[]>('/tasks');
  return response.data;
};

// Crear una nueva tarea
export const createTask = async (taskData: Omit<TaskDto, 'id' | 'completed'>): Promise<TaskDto> => {
  const response = await apiClient.post<TaskDto>('/tasks', taskData);
  return response.data;
};

// Actualizar el estado de una tarea (completada / pendiente)
export const updateTask = async (id: string | number, updates: Partial<TaskDto>): Promise<TaskDto> => {
  const response = await apiClient.patch<TaskDto>(`/tasks/${id}`, updates);
  return response.data;
};

// Eliminar una tarea
export const deleteTask = async (id: string | number): Promise<void> => {
  await apiClient.delete(`/tasks/${id}`);
};