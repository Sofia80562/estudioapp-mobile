import { describe, expect, it } from 'vitest';
import { subjectValidationSchema } from './subjects';

describe('subjectValidationSchema', () => {
  it('normaliza espacios y valida correctamente una materia con datos válidos', () => {
    const validData = {
      name: '  Base   de Datos I  ',
      code: '  BD-101  ',
      credits: 4,
      professor: '  Ing. Carlos Mendoza  ',
      schedule: 'Lunes 09:00 - 12:00',
      description: 'Fundamentos de bases de datos relacionales.',
    };

    const result = subjectValidationSchema.safeParse(validData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('Base de Datos I');
      expect(result.data.code).toBe('BD-101');
      expect(result.data.professor).toBe('Ing. Carlos Mendoza');
    }
  });

  it('falla si faltan campos obligatorios o no cumplen el mínimo', () => {
    const invalidData = {
      name: 'BD', // Muy corto (< 3 caracteres)
      code: '',
      credits: 0,
      professor: '',
    };

    const result = subjectValidationSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});