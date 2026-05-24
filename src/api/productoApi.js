import api from './axiosConfig';

/**
 * Servicios API para la gestión de productos.
 * Corresponde al ProductoController del backend (/api/productos).
 */

// Obtener todos los productos activos del catálogo
export const obtenerProductos = () => {
  return api.get('/productos');
};

// Obtener todos los productos (incluyendo inactivos)
export const obtenerTodosProductos = () => {
  return api.get('/productos/todos');
};

// Obtener un producto específico por su ID
export const obtenerProductoPorId = (id) => {
  return api.get(`/productos/${id}`);
};

// Buscar un producto por su código de barras
export const obtenerProductoPorBarcode = (codigo) => {
  return api.get(`/productos/barcode/${codigo}`);
};
