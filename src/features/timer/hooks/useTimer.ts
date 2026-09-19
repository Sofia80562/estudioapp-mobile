import { useState, useEffect, useCallback } from 'react';

export type TimerMode = 'work' | 'shortBreak' | 'longBreak';

const WORK_TIME = 25 * 60; // 25 minutos en segundos aja
const SHORT_BREAK = 5 * 60; // 5 minutos sip
const LONG_BREAK = 15 * 60; // 15 minutos 

export const useTimer = () => {
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState<number>(WORK_TIME);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Obtener la duración según el modo actual :D
  const getDurationForMode = (currentMode: TimerMode) => {
    switch (currentMode) {
      case 'work':
        return WORK_TIME;
      case 'shortBreak':
        return SHORT_BREAK;
      case 'longBreak':
        return LONG_BREAK;
    }
  };

  // Cambiar de modo (Pomodoro / Descansos)
  const changeMode = useCallback((newMode: TimerMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(getDurationForMode(newMode));
  }, []);

  // Control del temporizador y cuenta regresiva
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      // Aquí puedes integrar la notificación nativa local de Capacitor más adelante
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(getDurationForMode(mode));
  };

  // Formato mm:ss para mostrar en pantalla de manera limpia
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    mode,
    timeLeft,
    isRunning,
    formattedTime: formatTime(timeLeft),
    startTimer,
    pauseTimer,
    resetTimer,
    changeMode,
  };
};