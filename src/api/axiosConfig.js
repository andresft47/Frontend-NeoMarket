import axios from 'axios';
import { extractApiError } from './apiError';

/**
 * Instancia centralizada de Axios para todas las peticiones al backend.
 * La baseURL apunta a /api, que Vite redirige al backend (localhost:8080).
 */
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de respuestas para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const mensaje = extractApiError(error);
    error.apiMessage = mensaje;
    console.error('Error en petición API:', mensaje);
    return Promise.reject(error);
  }
);

export default api;
