export type SubjectStatus = 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';

export const SUBJECT_STATUS_LABELS: Record<SubjectStatus, string> = {
  ACTIVE: 'En Curso',
  COMPLETED: 'Aprobada / Finalizada',
  ARCHIVED: 'Archivada',
};