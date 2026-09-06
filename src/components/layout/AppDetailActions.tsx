import type { PropsWithChildren } from 'react';
import { IonButtons } from '@ionic/react';

interface AppDetailActionsProps extends PropsWithChildren {
  className: string;
}

/**
 * Componente contenedor para la fila de acciones en pantallas de detalle
 * (como Editar, Volver o Desactivar), estandarizando el uso de IonButtons.
 */
export const AppDetailActions: React.FC<AppDetailActionsProps> = ({ className, children }) => (
  <IonButtons className={className}>{children}</IonButtons>
);

export default AppDetailActions;