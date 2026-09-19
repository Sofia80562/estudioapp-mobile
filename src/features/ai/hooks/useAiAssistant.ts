import { useState } from 'react';

export const useAiAssistant = () => {
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string>('¡Hola! Soy tu asistente de estudio. Presiona el botón para recibir un consejo de productividad o priorizar tus tareas.');

  const fetchAiAdvice = async () => {
    setLoading(true);
    // Se simularía una respuesta inteligente rápida 
    setTimeout(() => {
      const tips = [
        'Organiza tus tareas usando la técnica Pomodoro: 25 minutos de enfoque total y 5 de descanso.',
        'Prioriza las tareas de mayor complejidad a primera hora de la mañana cuando tu energía está al máximo.',
        'Divide tus proyectos grandes en subtareas más pequeñas para evitar la fatiga mental.',
        'Mantén tu área de estudio despejada y aleja el teléfono móvil mientras uses el temporizador.'
      ];
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      setAdvice(randomTip);
      setLoading(false);
    }, 1000);
  };

  return {
    advice,
    loading,
    fetchAiAdvice,
  };
};