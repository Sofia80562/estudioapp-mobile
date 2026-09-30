import React from 'react';
import { render, screen } from '@testing-library/react';
import { TaskModal } from './TaskModal';

describe('TaskModal Component', () => {
  test('renders correctly when open', () => {
    render(<TaskModal isOpen={true} onClose={() => {}} onSave={() => {}} />);
    
    // Verifica que el título del modal aparezca en pantalla
    const titleElement = screen.getByText(/Nueva Tarea \/ Estudio/i);
    expect(titleElement).toBeDefined();
  });
});