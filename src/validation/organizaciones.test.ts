import { describe, expect, it } from 'vitest';
import { organizationFormSchema, venueFormSchema } from './organizaciones';

describe('organizationFormSchema', () => {
  it('normaliza espacios repetidos en el nombre', () => {
    const result = organizationFormSchema.safeParse({
      name: '   Institución   Educativa   ',
      legalName: '',
      taxIdentification: '',
      email: '',
      phone: '',
      domain: '',
    });

    expect(result.success).toBe(true);
    expect(result.success && result.data.name).toBe('Institución Educativa');
  });

  it('rechaza nombre vacío', () => {
    expect(organizationFormSchema.safeParse({ name: '    ' }).success).toBe(false);
  });

  it('acepta campos opcionales vacíos', () => {
    const result = organizationFormSchema.safeParse({
      name: 'Institución Educativa',
      legalName: '',
      taxIdentification: '',
      email: '',
      phone: '',
      domain: '',
    });

    expect(result.success).toBe(true);
  });

  it('rechaza un correo con formato inválido', () => {
    expect(organizationFormSchema.safeParse({ name: 'Institución Educativa', email: 'no-es-un-correo' }).success).toBe(false);
  });
});

describe('venueFormSchema', () => {
  it('normaliza espacios repetidos en el nombre', () => {
    const result = venueFormSchema.safeParse({ name: '   Campus   Norte   ', address: '', phone: '', email: '' });

    expect(result.success).toBe(true);
    expect(result.success && result.data.name).toBe('Campus Norte');
  });

  it('rechaza nombre vacío', () => {
    expect(venueFormSchema.safeParse({ name: '' }).success).toBe(false);
  });

  it('rechaza un correo con formato inválido', () => {
    expect(venueFormSchema.safeParse({ name: 'Campus Norte', email: 'no-es-un-correo' }).success).toBe(false);
  });
});