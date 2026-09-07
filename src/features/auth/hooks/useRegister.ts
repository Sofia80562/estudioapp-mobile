import { useMutation } from '@tanstack/react-query';
import { register } from '../../../services/api/endpoints/register';

// Sin invalidar queries de sesión: el registro nunca crea una sesión.
export const useRegisterMutation = () =>
  useMutation({
    mutationFn: register,
  });