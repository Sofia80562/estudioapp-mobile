import { describe, expect, it } from 'vitest';
import { isResourceId, normalizeResourceId } from './resource-id';

describe('selección de recurso o materia', () => {
  const resourceId = '550e8400-e29b-41d4-a716-446655440000';

  it('acepta únicamente identificadores UUID', () => {
    expect(normalizeResourceId(resourceId)).toBe(resourceId);
    expect(isResourceId(resourceId)).toBe(true);
  });

  it.each([undefined, null, '', 'undefined', 'materia-1'])(
    'descarta un valor inválido sin construir una URL (%s)',
    value => {
      expect(normalizeResourceId(value)).toBe('');
    },
  );
});