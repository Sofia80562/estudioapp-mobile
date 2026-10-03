import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { env } from '../../../config/env';

export interface SubjectDto {
    id: string;
    name: string;
    professor: string;
    credits: number;
    status: 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';
}

export type CreateSubjectDto = Omit<SubjectDto, 'id'>;

export const SUBJECTS_QUERY_KEY = ['subjects'];

// Función para obtener las materias desde el backend real usando cookies de sesión
const fetchSubjects = async (): Promise<SubjectDto[]> => {
    const response = await fetch(`${env.apiBaseUrl}/subjects`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Error al conectar con el servidor para cargar las materias.');
    }

    return response.json();
};

// Función para crear una nueva materia en el backend
const createSubject = async (newSubject: CreateSubjectDto): Promise<SubjectDto> => {
    const response = await fetch(`${env.apiBaseUrl}/subjects`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newSubject),
    });

    if (!response.ok) {
        throw new Error('No se pudo registrar la materia en el servidor.');
    }

    return response.json();
};

export const useSubjects = () => {
    const queryClient = useQueryClient();

    const subjectsQuery = useQuery({
        queryKey: SUBJECTS_QUERY_KEY,
        queryFn: fetchSubjects,
    });

    // Mutación para agregar materias de forma reactiva
    const createMutation = useMutation({
        mutationFn: createSubject,
        onSuccess: () => {
            // Invalida y refresca automáticamente la lista de materias tras crear una nueva
            queryClient.invalidateQueries({ queryKey: SUBJECTS_QUERY_KEY });
        },
    });

    return {
        ...subjectsQuery,
        subjects: subjectsQuery.data ?? [],
        createSubject: createMutation.mutateAsync,
        isCreating: createMutation.isPending,
    };
};