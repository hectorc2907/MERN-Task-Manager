import { useEffect, useState } from "react"; // Importa hooks de React
import { get, deleteTasks } from "../services/tasksServices.js"; // Importa funciones para obtener y eliminar tareas
import { toast } from "react-hot-toast"; // Importa el sistema de notificaciones
import { adjustTime } from "../utils/time.js"; // Importa la función para ajustar la hora

const Admin = () => {
  const [tasks, setTasks] = useState([]); // Estado para almacenar las tareas

  useEffect(() => {
    // Hook para obtener las tareas cuando el componente se monta
    const getMyTasks = async () => {
      try {
        const request = await get("/api/task/all-tasks"); // Realiza una solicitud para obtener todas las tareas
        const response = request.data; // Obtiene los datos de la respuesta
        if (request.status === 200) {
          setTasks(response.tasks); // Actualiza el estado con las tareas obtenidas
        }
      } catch (error) {
        console.error(error); // Manejo de errores en caso de fallo
      }
    };
    getMyTasks(); // Llama a la función para obtener tareas
  }, []); // Se ejecuta solo una vez al montar el componente

  const handleDelete = async (id) => {
    // Función para manejar la eliminación de una tarea
    try {
      const request = await deleteTasks(`/api/task/any-tasks/${id}`); // Realiza una solicitud para eliminar la tarea
      if (request.status === 200) {
        toast.success("Tarea Eliminada"); // Muestra un mensaje de éxito
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id)); // Actualiza el estado para eliminar la tarea de la lista
      }
    } catch (error) {
      toast.error("Operacion Fallida. Intente Nuevamente"); // Muestra un mensaje de error
    }
  };

  return (
    <div className="flex justify-center">
      <div className="container py-10">
        <h1 className="mb-5 text-center text-2xl">Todas las tareas</h1>
        {tasks.length > 0 ? (
          <div className="grid grid-cols-3 gap-x-10 gap-y-5">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="border border-slate-300 rounded-xl shadow-lg p-10 flex flex-col items-center"
              >
                <p>{task.title}</p>
                <p>
                  Creado:{" "}
                  {adjustTime(task.createdAt, 0).toLocaleDateString("es-AR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  {/* Muestra la fecha de creación de la tarea */}
                </p>
                <p>
                  Hora:{" "}
                  {adjustTime(task.createdAt, 0).toLocaleTimeString("es-AR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}{" "}
                  {/* Muestra la hora de creación de la tarea */}
                </p>
                <p>Creador: {task.user}</p>
                <button
                  onClick={() => handleDelete(task._id)} // Llama a la función de eliminación al hacer clic
                  className="mt-5 bg-red-600 hover:bg-red-500 text-white pointer px-8 py-3 rounded-xl"
                >
                  Borrar Tarea
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div>No hay Tareas</div> // Mensaje si no hay tareas
        )}
      </div>
    </div>
  );
};

export default Admin; // Exporta el componente Admin
