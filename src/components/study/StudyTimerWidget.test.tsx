import React from 'react';
import { render, screen } from '@testing-library/react';
import { StudyTimerWidget } from './StudyTimerWidget';

describe('StudyTimerWidget Component', () => {
  test('renders cronometro title and initial time correctly', () => {
    render(<StudyTimerWidget />);
    
    // Verifica que el título aparezca
    const titleElement = screen.getByText(/Cronómetro de Estudio/i);
    expect(titleElement).toBeDefined();

    // Verifica que el contador inicie en 00:00
    const timeElement = screen.getByText(/00:00/i);
    expect(timeElement).toBeDefined();
  });
});