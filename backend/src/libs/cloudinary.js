// Importaciones de la biblioteca Cloudinary y variables de entorno
import { v2 as cloudinary } from "cloudinary";
import { API_KEY, API_SECRET, CLOUD_NAME } from "../utils/envConfig.js";

// Configuración de Cloudinary con las credenciales de la cuenta
cloudinary.config({
  cloud_name: CLOUD_NAME, // Nombre de la nube de Cloudinary
  api_key: API_KEY, // Clave de API para autenticar las solicitudes
  api_secret: API_SECRET, // Secreto de API para autenticar las solicitudes
});

// Función para subir imágenes a Cloudinary
export const uploadImage = async (filePath) => {
  // Utiliza el uploader de Cloudinary para subir una imagen
  return await cloudinary.uploader.upload(filePath, {
    folder: "profileImage", // Carpeta en la que se almacenará la imagen
  });
};

// Función para eliminar imágenes de Cloudinary
export const deleteImage = async (id) => {
  // Utiliza el uploader de Cloudinary para destruir una imagen por su ID
  return await cloudinary.uploader.destroy(id);
};
