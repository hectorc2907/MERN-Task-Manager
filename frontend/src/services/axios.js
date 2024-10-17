import axios from "axios"; // Importa la biblioteca Axios para manejar solicitudes HTTP

// Obtiene la URL del backend desde las variables de entorno
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Crea una instancia de Axios para solicitudes generales
export const instance = axios.create({
  baseURL: backendUrl, // Configura la URL base para todas las solicitudes
  headers: {
    "Content-Type": "application/json", // Establece el tipo de contenido como JSON
  },
  withCredentials: true, // Permite el envío de cookies con las solicitudes
});

// Crea otra instancia de Axios específicamente para subir imágenes de perfil
export const instanceImageProfile = axios.create({
  baseURL: backendUrl, // Utiliza la misma URL base del backend
  headers: {
    "Content-Type": "multipart/form-data", // Establece el tipo de contenido como multipart/form-data para enviar archivos
  },
  withCredentials: true, // También permite el envío de cookies con estas solicitudes
});
