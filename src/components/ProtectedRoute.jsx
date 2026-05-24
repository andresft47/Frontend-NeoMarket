import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Componente de ruta protegida.
 * Si el usuario no está autenticado, redirige a la página de login.
 * Muestra un indicador de carga mientras se verifica la sesión.
 */
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, cargando } = useAuth();

  // Mientras verifica la sesión guardada, mostrar indicador de carga
  if (cargando) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
