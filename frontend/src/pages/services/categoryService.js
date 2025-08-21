import api from './api';

// Obtener todas las categorías
export const getCategories = async () => {
  try {
    const response = await api.get('/categorias');
    return response.data;
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    throw new Error('No se pudieron obtener las categorías.');
  }
};

// Obtener una categoría específica
export const getCategoryById = async (id) => {
  try {
    const response = await api.get(`/categorias/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la categoría con ID ${id}:`, error);
    throw new Error(`No se pudo obtener la categoría con ID ${id}.`);
  }
};

// Crear una categoría
export const createCategory = async (category) => {
  try {
    const response = await api.post('/categorias', category);
    return response.data;
  } catch (error) {
    console.error('Error al crear la categoría:', error);
    throw new Error('No se pudo crear la categoría.');
  }
};

// Actualizar categoría
export const updateCategory = async (id, category) => {
  try {
    const response = await api.put(`/categorias/${id}`, category);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la categoría con ID ${id}:`, error);
    throw new Error(`No se pudo actualizar la categoría con ID ${id}.`);
  }
};

// Eliminar categoría
export const deleteCategory = async (id) => {
  try {
    await api.delete(`/categorias/${id}`);
  } catch (error) {
    console.error(`Error al eliminar la categoría con ID ${id}:`, error);
    throw new Error(`No se pudo eliminar la categoría con ID ${id}.`);
  }
};
