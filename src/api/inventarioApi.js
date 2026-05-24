import api from './axiosConfig';

/**
 * Servicios API para la gestión de inventario.
 * Corresponde al InventarioController del backend (/api/inventario).
 */

// Obtener todo el inventario de la tienda
export const obtenerInventario = () => {
  return api.get('/inventario');
};

// Obtener alertas de productos con stock bajo
export const obtenerAlertas = () => {
  return api.get('/inventario/alertas');
};

// Obtener el inventario de un producto específico
export const obtenerInventarioProducto = (productoId) => {
  return api.get(`/inventario/producto/${productoId}`);
};
