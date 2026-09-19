import { useState } from 'react';
import { TaskItem } from '../components/TaskCard';

export const useTasks = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: 1,
      title: 'Repasar componentes de Ionic',
      description: 'Verificar el uso de IonCard y IonModal',
      completed: false,
      priority: 'high',
    },
    {
      id: 2,
      title: 'Configurar enrutamiento en Capacitor',
      description: 'Probar la app en dispositivo móvil',
      completed: true,
      priority: 'medium',
    },
  ]);

  const addTask = (taskData: Omit<TaskItem, 'id' | 'completed'>) => {
    const newTask: TaskItem = {
      id: Date.now(),
      ...taskData,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleCompleteTask = (id: string | number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string | number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return {
    tasks,
    addTask,
    toggleCompleteTask,
    deleteTask,
  };
};