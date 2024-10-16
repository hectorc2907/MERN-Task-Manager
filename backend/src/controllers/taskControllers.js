import TasksModel from "../models/taskModel.js";

// Controlador para crear una nueva tarea
export const createTask = async (req, res) => {
  try {
    // Extraemos el título de la tarea del cuerpo de la solicitud
    const { title } = req.body;

    // Obtenemos el usuario autenticado de la solicitud
    const user = req.user;

    // Verificamos si el usuario está disponible, de lo contrario devolvemos un 404
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Something went wrong, try again" });
    }

    // Creamos una nueva tarea con el título y el ID del usuario
    const task = new TasksModel({ title, userId: user._id });

    // Guardamos la tarea en la base de datos
    await task.save();

    // Enviamos una respuesta exitosa indicando que la tarea fue agregada
    return res.status(200).json({ success: true, message: "Task add" });
  } catch (error) {
    // En caso de error, devolvemos un estado 500 con un mensaje de error
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong, try again" });
  }
};

// Controlador para obtener las tareas del usuario autenticado
export const getMyTasks = async (req, res) => {
  try {
    // Obtenemos el usuario autenticado de la solicitud
    const user = req.user;

    // Buscamos todas las tareas asociadas al usuario utilizando su ID
    const tasks = await TasksModel.find({ userId: user._id });

    // Enviamos una respuesta exitosa con las tareas obtenidas
    return res.status(200).json({ success: true, tasks });
  } catch (error) {
    // En caso de error, devolvemos un estado 500 con un mensaje de error
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong, try again" });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    // Buscamos todas las tareas
    const tasks = await TasksModel.find();
    // Enviamos una respuesta exitosa con las tareas obtenidas
    return res.status(200).json({ success: true, tasks });
  } catch (error) {
    // En caso de error, devolvemos un estado 500 con un mensaje de error
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong, try again" });
  }
};
