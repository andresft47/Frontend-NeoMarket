import React, { createContext, useContext, useState, useEffect } from 'react';
import { registrarCliente, loginCliente, obtenerCliente } from '../api/clienteApi';
import { extractApiError } from '../api/apiError';

/**
 * Contexto de Autenticación.
 * Maneja el registro, login (email + contraseña) y logout del cliente.
 * Persiste la sesión en localStorage para sobrevivir recargas.
 */
const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [cliente, setCliente] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const clienteGuardado = localStorage.getItem('neomarket_cliente');
    if (clienteGuardado) {
      try {
        setCliente(JSON.parse(clienteGuardado));
      } catch {
        localStorage.removeItem('neomarket_cliente');
      }
    }
    setCargando(false);
  }, []);

  const login = async (email, password) => {
    const respuesta = await loginCliente({
      email: email.trim().toLowerCase(),
      password,
    });
    const encontrado = respuesta.data;

    setCliente(encontrado);
    localStorage.setItem('neomarket_cliente', JSON.stringify(encontrado));
    return encontrado;
  };

  const register = async (datos) => {
    const respuesta = await registrarCliente(datos);
    const nuevoCliente = respuesta.data;

    setCliente(nuevoCliente);
    localStorage.setItem('neomarket_cliente', JSON.stringify(nuevoCliente));
    return nuevoCliente;
  };

  const logout = () => {
    setCliente(null);
    localStorage.removeItem('neomarket_cliente');
  };

  const refrescarCliente = async () => {
    if (!cliente?.id) return;
    try {
      const respuesta = await obtenerCliente(cliente.id);
      setCliente(respuesta.data);
      localStorage.setItem('neomarket_cliente', JSON.stringify(respuesta.data));
    } catch {
      logout();
    }
  };

  const valor = {
    cliente,
    isAuthenticated: !!cliente,
    cargando,
    login,
    register,
    logout,
    refrescarCliente,
    extractApiError,
  };

  return (
    <AuthContext.Provider value={valor}>
      {children}
    </AuthContext.Provider>
  );
};
