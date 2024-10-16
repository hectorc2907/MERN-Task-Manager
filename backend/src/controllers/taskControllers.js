import TasksModel from "../models/taskModel.js";
import UserModel from "../models/userModel.js";

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
    return res.status(200).json({ success: true, message: "Task add", task });
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

// Controlador para obtener todas las tareas y agregar los nombres de los usuarios manualmente
export const getAllTasks = async (req, res) => {
  try {
    // 1. Obtenemos todas las tareas
    const tasks = await TasksModel.find();

    // 2. Creamos un array de IDs únicos de usuarios de las tareas
    const userIds = [...new Set(tasks.map((task) => task.userId))];

    // 3. Buscamos los usuarios por sus IDs
    const users = await UserModel.find({ _id: { $in: userIds } });

    // 4. Creamos un diccionario de usuarios por ID para fácil acceso
    const userMap = users.reduce((map, user) => {
      map[user._id] = user;
      return map;
    }, {});

    // 5. Combinamos cada tarea con los datos del usuario correspondiente
    const tasksWithUser = tasks.map((task) => ({
      ...task._doc, // Copia de los datos de la tarea
      user: userMap[task.userId]
        ? userMap[task.userId].name
        : "Usuario desconocido",
    }));

    // 6. Enviamos la respuesta con las tareas combinadas con el nombre del usuario
    return res.status(200).json({ success: true, tasks: tasksWithUser });
  } catch (error) {
    // En caso de error, devolvemos un estado 500 con un mensaje de error
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong, try again" });
  }
};

// Controlador para eliminar una tarea del usuario autenticado
export const deleteMyTask = async (req, res) => {
  try {
    // Obtenemos el ID de la tarea desde los parámetros de la solicitud
    const taskId = req.params.id;

    // Obtenemos el usuario autenticado de la solicitud
    const user = req.user;

    // Buscamos la tarea en la base de datos asegurando que pertenezca al usuario
    const task = await TasksModel.findOne({ _id: taskId, userId: user._id });

    // Si no encontramos la tarea, devolvemos un estado 404 con un mensaje de error
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    // Eliminamos la tarea si se encuentra y pertenece al usuario autenticado
    await TasksModel.deleteOne({ _id: taskId, userId: user._id });

    // Enviamos una respuesta exitosa indicando que la tarea fue eliminada
    return res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    // En caso de error, devolvemos un estado 500 con un mensaje de error
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong, try again" });
  }
};

// Controlador para eliminar una tarea por su ID
export const deleteTask = async (req, res) => {
  try {
    // Obtenemos el ID de la tarea desde los parámetros de la solicitud
    const taskId = req.params.id;

    // Buscamos y eliminamos la tarea directamente por su ID
    const task = await TasksModel.findByIdAndDelete(taskId);

    // Si la tarea no se encuentra, devolvemos un estado 404 con un mensaje de error
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    // Si la eliminación es exitosa, devolvemos una respuesta con estado 200
    return res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    // En caso de error, devolvemos un estado 500 con un mensaje de error
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong, try again" });
  }
};
