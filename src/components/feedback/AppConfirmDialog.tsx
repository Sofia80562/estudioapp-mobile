import AppInteractionAlert from './AppInteractionAlert';

interface AppConfirmDialogProps {
  isOpen: boolean;
  header: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Componente de diálogo de confirmación explícita para acciones sensibles
 * (como desactivar un usuario o remover un rol) antes de ejecutar cualquier mutación.
 */
export const AppConfirmDialog: React.FC<AppConfirmDialogProps> = ({
  isOpen,
  header,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  isDestructive = false,
  onConfirm,
  onCancel,
}) => (
  <AppInteractionAlert
    isOpen={isOpen}
    kind={isDestructive ? 'warning' : 'info'}
    header={header}
    message={message}
    onDismiss={onCancel}
    buttons={[
      { text: cancelText, role: 'cancel', handler: onCancel },
      {
        text: confirmText,
        role: isDestructive ? 'destructive' : undefined,
        cssClass: isDestructive ? 'app-confirm-dialog__destructive' : undefined,
        handler: onConfirm,
      },
    ]}
  />
);

export default AppConfirmDialog;