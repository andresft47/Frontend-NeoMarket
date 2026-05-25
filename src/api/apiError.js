/**
 * Extrae un mensaje legible de un error de Axios/API.
 */
export const extractApiError = (error) => {
  const data = error?.response?.data;
  if (typeof data === 'string') return data;
  if (data?.message) return data.message;
  if (data?.error) return data.error;
  return error?.message || 'Error de conexión con el servidor';
};
