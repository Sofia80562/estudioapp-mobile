import { fireEvent, render, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ManagerRegisterForm from './ManagerRegisterForm';

// Pruebas unitarias para el formulario de registro de gestores/organizadores,
// verificando tanto la validación de campos obligatorios como el envío exitoso de datos.
describe('ManagerRegisterForm', () => {
  it('shows validation errors for missing account, organization and venue fields', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    const { container } = render(<ManagerRegisterForm onSubmit={onSubmit} />);

    const form = container.querySelector('form');
    expect(form).not.toBeNull();
    fireEvent.submit(form!);

    await waitFor(() => {
      expect(container.querySelector('ion-input[label="Correo electrónico"]')).toHaveAttribute(
        'error-text',
        'Ingresa un correo electrónico válido',
      );
      expect(container.querySelector('ion-input[label="Nombre del grupo o institución"]')).toHaveAttribute(
        'error-text',
        'El nombre del grupo o institución es obligatorio',
      );
      expect(container.querySelector('ion-input[label="Nombre de la sede de estudio"]')).toHaveAttribute(
        'error-text',
        'El nombre de la sede de estudio es obligatorio',
      );
    });

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits with the organization and venue values when everything required is filled', async () => {
    let resolveSubmit: () => void = () => {};
    const onSubmit = vi.fn(
      () =>
        new Promise<void>(resolve => {
          resolveSubmit = resolve;
        }),
    );

    const { container } = render(
      <ManagerRegisterForm
        onSubmit={onSubmit}
        defaultValues={{
          firstName: 'Bruno',
          lastName: 'Diaz',
          email: 'bruno@example.com',
          password: 'contraseñaSegura123',
          organization: { name: 'Mi Grupo de Estudio' },
          venue: { name: 'Sede Principal' },
        }}
      />,
    );

    const form = container.querySelector('form');
    fireEvent.submit(form!);

    await waitFor(() => {
      expect(container.querySelector('ion-button[type="submit"]')).toHaveAttribute('disabled');
    });

    resolveSubmit();
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          organization: expect.objectContaining({ name: 'Mi Grupo de Estudio' }),
          venue: expect.objectContaining({ name: 'Sede Principal' }),
        }),
      );
    });
  });
});