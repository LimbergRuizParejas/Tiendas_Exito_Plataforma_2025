import api from './api'; // Tu instancia de axios personalizada

/**
 * Obtener el inventario con precios y cantidades aseguradas como números
 */
export const getInventory = async () => {
  try {
    const response = await api.get('/inventory');
    return response.data.map(item => ({
      ...item,
      precio: parseFloat(item.precio) || 0,
      cantidad: parseInt(item.cantidad, 10) || 0,
    }));
  } catch (error) {
    handleApiError('obtener el inventario', error);
  }
};

/**
 * Obtener resumen del inventario: total productos y valor total
 */
export const getInventorySummary = async () => {
  try {
    const response = await api.get('/inventory/summary');
    return response.data;
  } catch (error) {
    handleApiError('obtener el resumen del inventario', error);
  }
};

/**
 * Agregar un nuevo producto al inventario
 */
export const addInventoryItem = async (item) => {
  try {
    const response = await api.post('/inventory', item);
    console.log('✅ Producto agregado:', response.data);
    return response.data;
  } catch (error) {
    handleApiError('agregar el producto', error);
  }
};

/**
 * Actualizar un producto existente en el inventario (PUT)
 */
export const updateInventoryItem = async (id, updatedItem) => {
  try {
    const response = await api.put(`/inventory/${id}`, updatedItem);
    console.log('✏️ Producto actualizado:', response.data);
    return response.data;
  } catch (error) {
    handleApiError('actualizar el producto', error);
  }
};

/**
 * Eliminar un producto del inventario
 */
export const deleteInventoryItem = async (id) => {
  try {
    const response = await api.delete(`/inventory/${id}`);
    console.log('🗑 Producto eliminado:', response.data);
    return response.data;
  } catch (error) {
    handleApiError('eliminar el producto', error);
  }
};

/**
 * Obtener categorías para filtros o formularios
 */
export const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    handleApiError('obtener las categorías', error);
  }
};

/**
 * Obtener marcas para filtros o formularios
 */
export const getBrands = async () => {
  try {
    const response = await api.get('/brands');
    return response.data;
  } catch (error) {
    handleApiError('obtener las marcas', error);
  }
};

/**
 * Buscar producto por código de barras (si implementas esa ruta)
 */
export const getProductByBarcode = async (barcode) => {
  try {
    const response = await api.get(`/inventory/barcode/${barcode}`);
    return response.data;
  } catch (error) {
    handleApiError('buscar producto por código de barras', error);
  }
};

/**
 * Función auxiliar para manejar errores de forma uniforme
 */
const handleApiError = (context, error) => {
  const message = error.response?.data?.message || error.message || 'Error desconocido';
  console.error(`🚨 Error al ${context}:`, message);
  throw new Error(`No se pudo ${context}.`);
};
