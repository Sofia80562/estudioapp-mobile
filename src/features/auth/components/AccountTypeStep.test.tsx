import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AccountTypeStep from './AccountTypeStep';

describe('AccountTypeStep', () => {
  it('calls onSelect with "estudiante" when the student card is chosen', () => {
    const onSelect = vi.fn();
    render(<AccountTypeStep onSelect={onSelect} />);

    fireEvent.click(screen.getByText('Estudiante y metas académicas'));

    expect(onSelect).toHaveBeenCalledWith('estudiante');
  });

  it('calls onSelect with "organizador" when the manager card is chosen', () => {
    const onSelect = vi.fn();
    render(<AccountTypeStep onSelect={onSelect} />);

    fireEvent.click(screen.getByText('Gestionar grupos o sedes'));

    expect(onSelect).toHaveBeenCalledWith('organizador');
  });
});