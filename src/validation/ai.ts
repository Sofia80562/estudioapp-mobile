import { z } from 'zod';

export const aiRecommendationFormSchema = z
  .object({
    fromDate: z.string().date('Selecciona una fecha inicial.'),
    toDate: z.string().date('Selecciona una fecha final.'),
    preferredTimeOfDay: z.enum(['', 'MORNING', 'AFTERNOON', 'EVENING']),
    maxDailyStudyHours: z.string(),
  })
  .superRefine((value, context) => {
    const from = new Date(`${value.fromDate}T00:00:00`);
    const to = new Date(`${value.toDate}T23:59:59`);
    if (from <= new Date()) context.addIssue({ code: 'custom', path: ['fromDate'], message: 'El rango debe comenzar en el futuro.' });
    if (from >= to) context.addIssue({ code: 'custom', path: ['toDate'], message: 'La fecha final debe ser posterior.' });
    if (to.getTime() - from.getTime() > 7 * 24 * 60 * 60 * 1000)
      context.addIssue({ code: 'custom', path: ['toDate'], message: 'El rango no puede superar siete días.' });
    if (value.maxDailyStudyHours && (!Number.isFinite(Number(value.maxDailyStudyHours)) || Number(value.maxDailyStudyHours) < 0 || Number(value.maxDailyStudyHours) > 24))
      context.addIssue({ code: 'custom', path: ['maxDailyStudyHours'], message: 'Ingresa un número de horas válido (entre 0 y 24).' });
  });

export type AiRecommendationForm = z.infer<typeof aiRecommendationFormSchema>;