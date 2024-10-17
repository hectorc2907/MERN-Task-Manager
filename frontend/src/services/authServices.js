import { instance, instanceImageProfile } from "./axios.js"; // Importa instancias de Axios configuradas

// Función para enviar una solicitud POST
export const post = (url, data) => instance.post(url, data);

// Función para enviar una solicitud GET
export const get = (url, params) => instance.get(url, { params });

// Función para enviar una solicitud PUT para subir una imagen de perfil
export const put = async (url, file) => {
  const form = new FormData(); // Crea un nuevo objeto FormData para manejar archivos
  form.append("profileImage", file); // Añade el archivo de imagen al formulario
  return await instanceImageProfile.put(url, form); // Realiza la solicitud PUT con la imagen
};

// Interceptor para las solicitudes
instance.interceptors.request.use(
  function (config) {
    // Manipula la configuración de la solicitud antes de enviarla
    return config;
  },
  function (error) {
    // Maneja errores en la configuración de la solicitud
    return Promise.reject(error);
  }
);

// Interceptor para las respuestas
instance.interceptors.response.use(
  function (response) {
    // Manipula la respuesta antes de que sea manejada por then o catch
    return response;
  },
  function (error) {
    // Maneja errores en la respuesta de la solicitud
    return Promise.reject(error);
  }
);
