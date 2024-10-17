import { instance } from "./axios.js"; // Importa la instancia de Axios configurada previamente

// Función para realizar una solicitud POST
export const post = (url, data) => instance.post(url, data);

// Función para realizar una solicitud GET
export const get = (url, params) => instance.get(url, { params });

// Función para eliminar tareas mediante una solicitud DELETE
export const deleteTasks = (url) => instance.delete(url);

// Interceptor de solicitud
instance.interceptors.request.use(
  function (config) {
    return config; // Devuelve la configuración de la solicitud sin modificaciones
  },
  function (error) {
    return Promise.reject(error); // Rechaza la promesa en caso de error
  }
);

// Interceptor de respuesta
instance.interceptors.response.use(
  function (response) {
    return response; // Devuelve la respuesta sin modificaciones
  },
  function (error) {
    return Promise.reject(error); // Rechaza la promesa en caso de error
  }
);
