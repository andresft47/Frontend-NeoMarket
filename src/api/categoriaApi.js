import api from './axiosConfig';

/**
 * Servicios API para la gestión de categorías.
 * Corresponde al CategoriaController del backend (/api/categorias).
 */

// Obtener todas las categorías disponibles
export const obtenerCategorias = () => {
  return api.get('/categorias');
};

// Obtener una categoría por su ID
export const obtenerCategoriaPorId = (id) => {
  return api.get(`/categorias/${id}`);
};
