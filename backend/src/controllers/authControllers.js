import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

//controlador de registro
export const userRegister = async (req, res) => {
  try {
    //solicitamos al body los datos
    const { name, email, password } = req.body;
    //la imagen se estable en nulo ya que no es necesaria en el registro
    let image = null;

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
      image,
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
