import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/envConfig.js";

//controlador de registro
export const userRegister = async (req, res) => {
  try {
    //solicitamos al body los datos
    const { name, email, password } = req.body;
    //la imagen se estable en nulo ya que no es necesaria en el registro
    let profileImage = null;

    //verificamos si el email ya esta registrado, en caso de que si finalizamos con un mensaje
    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email is already registered" });
    }

    //en caso de que el email no este en uso pasamos a encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    //creamos el usuario con los datos proporcionados
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      profileImage,
    });

    //guardamos el usuario en la base datos
    await newUser.save();

    //configuramos la respuesta para que muestre solo campos de interes
    const user = await UserModel.findById(newUser._id).select(
      "-_id name email role"
    );

    //si todo salio bien recibiremos una respuesta positiva con los datos de interes
    res.status(200).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    //en caso de que algo fallara nos devolvera el siguiente estado y mensaje
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong, try again" });
  }
};

export const userLogin = async (req, res) => {
  try {
    //solicitamos al body los datos
    const { email, password } = req.body;

    //verificamos si el correo existe en la base de datos, en caso de que no, enviamos un mensaje de credenciales invalidas con un estado 404 not found
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }

    //en caso de que si exista el correo comparamos la contraseña provista con la encriptada, si no son las mismas enviamos un estado 401 Unauthorized, con el mismo mensaje de error
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    //si todo lo anterior sale bien procedemos a crear el token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    //configuramos el token dentro de las cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3 * 60 * 60 * 1000,
    });

    //devolvemos el mensaje de login correcto
    return res
      .status(200)
      .json({ success: true, message: "Login Successfully" });
  } catch (error) {
    //en caso de que algo fallara nos devolvera el siguiente estado y mensaje
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong, try again" });
  }
};
