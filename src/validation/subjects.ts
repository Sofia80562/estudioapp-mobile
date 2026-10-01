import { z } from 'zod';

const normalizeText = (value: string): string => value.trim().replace(/\s+/gu, ' ');

export const subjectValidationSchema = z.object({
  name: z
    .string()
    .transform(normalizeText)
    .pipe(z.string().min(3, 'El nombre de la materia es obligatorio y debe tener al menos 3 caracteres.').max(150, 'Máximo 150 caracteres.')),
  code: z
    .string()
    .transform(normalizeText)
    .pipe(z.string().min(2, 'El código de la materia es obligatorio.').max(30, 'Máximo 30 caracteres.')),
  credits: z.number().min(1, 'Debe tener al menos 1 crédito.').max(10, 'El máximo de créditos permitido es 10.'),
  professor: z
    .string()
    .transform(normalizeText)
    .pipe(z.string().min(3, 'El nombre del profesor es obligatorio.').max(150, 'Máximo 150 caracteres.')),
  schedule: z.string().max(100, 'Máximo 100 caracteres.').optional().or(z.literal('')),
  description: z.string().max(500, 'Máximo 500 caracteres.').optional().or(z.literal('')),
});

export type SubjectValidationInput = z.infer<typeof subjectValidationSchema>;