import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ShareResourceCard } from '../ShareResourceCard';
import { AuthContext } from '../../../context/AuthContext';

// Mock del contexto de autenticación
const mockShareResource = jest.fn();
const mockAuthContext = {
  shareResource: mockShareResource
};

// Wrapper del contexto para las pruebas
const renderWithAuthContext = (ui) => {
  return render(
    <AuthContext.Provider value={mockAuthContext}>
      {ui}
    </AuthContext.Provider>
  );
};

describe('ShareResourceCard', () => {
  beforeEach(() => {
    // Limpiar todos los mocks antes de cada prueba
    jest.clearAllMocks();
  });

  test('no se renderiza cuando el usuario no está autenticado', () => {
    const { container } = renderWithAuthContext(
      <ShareResourceCard isAuthenticated={false} />
    );
    expect(container.firstChild).toBeNull();
  });

  test('muestra los botones de recursos cuando el usuario está autenticado', () => {
    renderWithAuthContext(
      <ShareResourceCard 
        isAuthenticated={true} 
        user={{ name: "Test User" }} 
      />
    );

    expect(screen.getByText('Documento')).toBeInTheDocument();
    expect(screen.getByText('Enlace')).toBeInTheDocument();
    expect(screen.getByText('Video YouTube')).toBeInTheDocument();
    expect(screen.getByText('Imagen')).toBeInTheDocument();
  });

  test('muestra el formulario al hacer clic en un tipo de recurso', () => {
    renderWithAuthContext(
      <ShareResourceCard 
        isAuthenticated={true} 
        user={{ name: "Test User" }} 
      />
    );

    // Hacer clic en el botón de documento
    fireEvent.click(screen.getByText('Documento'));

    // Verificar que aparece el formulario
    expect(screen.getByText('Compartir Documento')).toBeInTheDocument();
    expect(screen.getByLabelText('Título *')).toBeInTheDocument();
    expect(screen.getByLabelText('Descripción *')).toBeInTheDocument();
  });

  test('permite agregar y eliminar temas', () => {
    renderWithAuthContext(
      <ShareResourceCard 
        isAuthenticated={true} 
        user={{ name: "Test User" }} 
      />
    );

    // Hacer clic en cualquier tipo de recurso para mostrar el formulario
    fireEvent.click(screen.getByText('Documento'));

    // Agregar un tema
    const topicInput = screen.getByPlaceholderText('Escribe un tema o selecciona uno');
    fireEvent.change(topicInput, { target: { value: 'Matemáticas' } });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    // Verificar que el tema se agregó
    expect(screen.getByText('Matemáticas')).toBeInTheDocument();

    // Eliminar el tema
    const removeButton = screen.getByRole('button', { name: /remove/i });
    fireEvent.click(removeButton);

    // Verificar que el tema se eliminó
    expect(screen.queryByText('Matemáticas')).not.toBeInTheDocument();
  });
}); 