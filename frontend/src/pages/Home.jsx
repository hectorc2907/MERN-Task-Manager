import { useEffect, useState } from "react"; // Importa hooks de React
import { get, deleteTasks, post } from "../services/tasksServices.js"; // Importa funciones para obtener, eliminar y agregar tareas
import { toast } from "react-hot-toast"; // Importa el sistema de notificaciones
import { adjustTime } from "../utils/time.js"; // Importa la función para ajustar la hora

const Home = () => {
  const [tasks, setTasks] = useState([]); // Estado para almacenar las tareas
  const [title, setTitle] = useState(""); // Estado para almacenar el título de la nueva tarea

  useEffect(() => {
    // Hook para obtener las tareas cuando el componente se monta
    const getMyTasks = async () => {
      try {
        const request = await get("/api/task"); // Realiza una solicitud para obtener todas las tareas
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

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario
    try {
      const request = await post("/api/task", { title }); // Realiza una solicitud para agregar una nueva tarea
      const response = request.data; // Obtiene los datos de la respuesta
      if (request.status === 200) {
        setTasks([...tasks, response.task]); // Actualiza el estado para incluir la nueva tarea
        toast.success("Tarea Agregada Exitosamente"); // Muestra un mensaje de éxito
        setTitle(""); // Resetea el título de la tarea
        e.target.reset(); // Limpia el formulario
      }
    } catch (error) {
      toast.error("Operacion Fallida. Intente Nuevamente"); // Muestra un mensaje de error
    }
  };

  const handleDelete = async (id) => {
    // Función para manejar la eliminación de una tarea
    try {
      const request = await deleteTasks(`/api/task/${id}`); // Realiza una solicitud para eliminar la tarea
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
        <div className="flex justify-center mb-5">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="task" className="text-center text-2xl">
              Nueva Tarea
            </label>
            <input
              type="text"
              id="task"
              onInput={(e) => setTitle(e.target.value)} // Actualiza el estado del título al escribir
              className="w-full mt-5 px-4 py-2 text-lg border border-slate-300 rounded-md"
            />
            <div className="flex justify-center">
              <button
                type="submit" // Establece el botón como de tipo submit
                className="mt-5 w-44 bg-blue-800 hover:bg-blue-700 text-white pointer px-8 py-3 rounded-xl"
              >
                Agregar
              </button>
            </div>
          </form>
        </div>
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

export default Home; // Exporta el componente Home
