import api from './axiosConfig';

/**
 * Servicios API para la gestión de compras.
 * Corresponde al CompraController del backend (/api/compras).
 */

// Registrar una nueva compra (desde el carrito)
// dto: { clienteId, metodoPago, cajero, detalles: [{ productoId, cantidad }] }
export const registrarCompra = (dto) => {
  return api.post('/compras', dto);
};

// Obtener el historial de compras de un cliente
export const obtenerComprasCliente = (clienteId) => {
  return api.get(`/compras/cliente/${clienteId}`);
};

// Obtener el resumen de ventas del día actual
export const obtenerResumenHoy = () => {
  return api.get('/compras/resumen/hoy');
};

// Obtener una compra específica por su ID
export const obtenerCompraPorId = (id) => {
  return api.get(`/compras/${id}`);
};
