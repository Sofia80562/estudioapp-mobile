export interface Subject {
  id: string;
  name: string;
  code: string;
  credits: number;
  professor: string;
  schedule?: string;
  description?: string;
  createdAt?: string;
}

export interface CreateSubjectRequest {
  name: string;
  code: string;
  credits: number;
  professor: string;
  schedule?: string;
  description?: string;
}

export interface UpdateSubjectRequest extends Partial<CreateSubjectRequest> {}