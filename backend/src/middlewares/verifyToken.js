import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/envConfig.js";

//verificamos de token de usuario
export const isUser = async (req, res, next) => {
  try {
    //recuperamos el token de las cookies y verificamos si existe, en caso de que no, devolvemos el mensaje de no autorizado
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: No token provided" });
    }

    //decodificamos el token
    const decoded = jwt.verify(token, JWT_SECRET);

    //al decodificar el token podemos acceder a userId que configuramos al momento de hacer login y crear el token, con ello buscamos al usuario en la base de datos, si no existe devolvemos un mensaje de usuario no encontrado
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    //guardamos el usuario encontrado en req.user para utilizarlo en el chequeo
    req.user = user;

    next();
  } catch (error) {
    //en caso de que algo fallara nos devolvera el siguiente estado y mensaje
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong, try again" });
  }
};
