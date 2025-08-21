import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Asegúrate de que esta URL coincida con tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para solicitudes (opcional)
api.interceptors.request.use(
  (config) => {
    // Aquí puedes agregar lógica antes de enviar cada solicitud, como añadir un token de autenticación
    // Ejemplo:
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    console.error('Error en la solicitud:', error.message);
    return Promise.reject(error);
  }
);

// Interceptor para respuestas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejo de errores globales
    if (error.response) {
      console.error('Error en la API:', {
        status: error.response.status,
        data: error.response.data,
      });

      // Puedes manejar diferentes códigos de error aquí
      if (error.response.status === 401) {
        alert('No autorizado. Por favor, inicia sesión nuevamente.');
        // Redirigir al usuario a la página de inicio de sesión si es necesario
       
        // window.location.href = '/login';
      }

      if (error.response.status === 404) {
        alert('El recurso solicitado no fue encontrado.');
      }

      if (error.response.status >= 500) {
        alert('Ocurrió un error en el servidor. Por favor, intenta más tarde.');
      }
    } else if (error.request) {
      console.error('Error en la solicitud: No se recibió respuesta del servidor.', error.request);
      alert('No se pudo conectar con el servidor. Por favor, revisa tu conexión a internet.');
    } else {
      console.error('Error:', error.message);
      alert('Ocurrió un error desconocido. Por favor, intenta más tarde.');
    }

    return Promise.reject(error);
  }
);

export default api;
