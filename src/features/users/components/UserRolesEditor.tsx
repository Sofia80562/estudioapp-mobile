import { useRoles } from '../../roles/hooks/useRoles';
import AppSelect from '../../../components/forms/AppSelect';

interface UserRolesEditorProps {
  organizationId: string | undefined;
  value: string[];
  onChange: (roleIds: string[]) => void;
  excludeRoleIds?: string[];
  error?: string;
  disabled?: boolean;
}

const UserRolesEditor: React.FC<UserRolesEditorProps> = ({
  organizationId,
  value,
  onChange,
  excludeRoleIds = [],
  error,
  disabled = false,
}) => {
  const { data, isLoading, isError } = useRoles(organizationId);

  const options = (data?.data ?? [])
    .filter(role => !excludeRoleIds.includes(role.id))
    .map(role => ({ value: role.id, label: role.name }));

  return (
    <AppSelect
      label="Roles"
      multiple
      placeholder={
        !organizationId
          ? 'Selecciona primero una organización'
          : isLoading
            ? 'Cargando roles…'
            : options.length === 0
              ? 'No hay roles disponibles para asignar'
              : 'Selecciona roles (opcional)'
      }
      options={options}
      value={value}
      disabled={disabled || !organizationId || isLoading || isError}
      error={error ?? (isError ? 'No se pudieron cargar los roles de esta organización.' : undefined)}
      onIonChange={event => onChange((event.detail.value as string[]) ?? [])}
    />
  );
};

export default UserRolesEditor;