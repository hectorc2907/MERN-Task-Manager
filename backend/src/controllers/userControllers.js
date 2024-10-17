import UserModel from "../models/userModel.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

// Controlador para actualizar la imagen de perfil
export const updateImage = async (req, res) => {
  try {
    const user = req.user; // Obtenemos el usuario autenticado
    console.log(user);

    // Verificamos si se ha subido un archivo de imagen
    if (req.files && req.files.profileImage) {
      // Si el usuario ya tiene una imagen, la eliminamos de Cloudinary
      if (user.profileImage?.public_id) {
        await deleteImage(user.profileImage.public_id);
      }

      // Subimos la nueva imagen a Cloudinary
      const result = await uploadImage(req.files.profileImage.tempFilePath);

      // Eliminamos el archivo temporal después de la subida
      await fs.remove(req.files.profileImage.tempFilePath);

      // Actualizamos el objeto de la imagen de perfil
      req.body.profileImage = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    // Actualizamos la información del usuario en la base de datos
    const updatedImage = await UserModel.findByIdAndUpdate(
      user._id,
      { $set: req.body },
      { new: true } // Retorna el nuevo objeto del usuario
    );

    // Si el usuario no se encuentra, enviamos un error 404
    if (!updatedImage) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Enviamos la respuesta exitosa
    return res
      .status(200)
      .json({ success: true, message: "Image updated", updatedImage });
  } catch (error) {
    // En caso de error, enviamos un mensaje de error
    return res.status(500).json({ success: false, message: error.message });
  }
};
