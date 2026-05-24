import api from './axiosConfig';
import { extractApiError } from './apiError';

export { extractApiError };

/**
 * Servicios API para la gestión de clientes.
 * Corresponde al ClienteController del backend (/api/clientes).
 */

// Registrar un nuevo cliente en el sistema
export const registrarCliente = (datos) => {
  return api.post('/clientes', datos);
};

// Iniciar sesión con correo y contraseña
export const loginCliente = (datos) => {
  return api.post('/clientes/login', datos);
};

// Buscar clientes por nombre, apellido o email
export const buscarClientes = (termino) => {
  return api.get('/clientes/buscar', { params: { q: termino } });
};

// Obtener un cliente específico por su ID
export const obtenerCliente = (id) => {
  return api.get(`/clientes/${id}`);
};

// Actualizar los datos de un cliente existente
export const actualizarCliente = (id, datos) => {
  return api.put(`/clientes/${id}`, datos);
};

// Obtener la lista de todos los clientes activos
export const obtenerClientesActivos = () => {
  return api.get('/clientes');
};
