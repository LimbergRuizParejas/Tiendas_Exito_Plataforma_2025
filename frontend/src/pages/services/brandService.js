import api from './api';

// Obtener todas las marcas
export const getBrands = async () => {
  try {
    const response = await api.get('/marcas');
    return response.data;
  } catch (error) {
    console.error('Error al obtener las marcas:', error);
    throw new Error('No se pudieron obtener las marcas. Intenta nuevamente.');
  }
};

// Obtener una marca específica
export const getBrandById = async (id) => {
  try {
    const response = await api.get(`/marcas/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la marca con ID ${id}:`, error);
    throw new Error(`No se pudo obtener la marca con ID ${id}. Intenta nuevamente.`);
  }
};

// Crear una nueva marca
export const createBrand = async (brand) => {
  try {
    const response = await api.post('/marcas', brand);
    return response.data;
  } catch (error) {
    console.error('Error al crear la marca:', error);
    throw new Error('No se pudo crear la marca. Revisa los datos ingresados.');
  }
};

// Actualizar una marca existente
export const updateBrand = async (id, brand) => {
  try {
    const response = await api.put(`/marcas/${id}`, brand);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la marca con ID ${id}:`, error);
    throw new Error(`No se pudo actualizar la marca con ID ${id}. Revisa los datos ingresados.`);
  }
};

// Eliminar una marca
export const deleteBrand = async (id) => {
  try {
    await api.delete(`/marcas/${id}`);
  } catch (error) {
    console.error(`Error al eliminar la marca con ID ${id}:`, error);
    throw new Error(`No se pudo eliminar la marca con ID ${id}.`);
  }
};
