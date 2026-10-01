import { 
  businessOutline, 
  keyOutline, 
  peopleOutline, 
  shieldCheckmarkOutline, 
  bookOutline, 
  timerOutline, 
  sparklesOutline 
} from 'ionicons/icons';

export interface AdminNavigationItem {
  id: string;
  label: string;
  description: string;
  icon: string;
  path: string;
  requiredPermissions: string[];
}

export interface AdminNavigationGroup {
  id: string;
  label: string;
  items: AdminNavigationItem[];
}

export const ADMIN_NAVIGATION: AdminNavigationGroup[] = [
  {
    id: 'academic',
    label: 'EstudioApp',
    items: [
      {
        id: 'subjects',
        label: 'Mis Materias',
        description: 'Gestiona tus asignaturas, profesores y créditos.',
        icon: bookOutline,
        path: '/admin/subjects',
        requiredPermissions: [],
      },
      {
        id: 'timer',
        label: 'Temporizador',
        description: 'Controla tus sesiones de estudio Pomodoro.',
        icon: timerOutline,
        path: '/admin/timer',
        requiredPermissions: [],
      },
      {
        id: 'ai-assistant',
        label: 'Asistente IA',
        description: 'Resuelve dudas académicas con asistencia inteligente.',
        icon: sparklesOutline,
        path: '/admin/ai-assistant',
        requiredPermissions: [],
      },
    ],
  },
  {
    id: 'users-access',
    label: 'Usuarios y acceso',
    items: [
      {
        id: 'users',
        label: 'Usuarios',
        description: 'Consulta y administra las cuentas autorizadas.',
        icon: peopleOutline,
        path: '/admin/users',
        requiredPermissions: ['users.read'],
      },
      {
        id: 'roles',
        label: 'Roles',
        description: 'Organiza el acceso mediante roles por organización.',
        icon: shieldCheckmarkOutline,
        path: '/admin/roles',
        requiredPermissions: ['roles.read'],
      },
      {
        id: 'permissions',
        label: 'Permisos',
        description: 'Consulta el catálogo global de capacidades.',
        icon: keyOutline,
        path: '/admin/permissions',
        requiredPermissions: ['permisos.read'],
      },
    ],
  },
  {
    id: 'structure',
    label: 'Estructura',
    items: [
      {
        id: 'organizations',
        label: 'Organizaciones',
        description: 'Administra organizaciones y sus sedes.',
        icon: businessOutline,
        path: '/admin/organizations',
        requiredPermissions: ['organizaciones.read'],
      },
    ],
  },
];