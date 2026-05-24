import api from './axiosConfig';

/**
 * Servicios API para el Motor de Predicción IA.
 * Corresponde al PrediccionController del backend (/api/predicciones).
 */

// Predecir las próximas compras de un cliente basado en su historial
export const predecirComprasCliente = (clienteId) => {
  return api.get(`/predicciones/cliente/${clienteId}`);
};

// Obtener los productos más vendidos de la tienda
export const obtenerMasVendidos = (top = 10) => {
  return api.get('/predicciones/mas-vendidos', { params: { top } });
};

// Obtener pedidos sugeridos para proveedores (basado en stock y demanda)
export const obtenerPedidosSugeridos = () => {
  return api.get('/predicciones/pedidos-sugeridos');
};
