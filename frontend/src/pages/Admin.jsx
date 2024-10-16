import { useEffect, useState } from "react";
import { get, deleteTasks } from "../services/tasksServices.js";
import { toast } from "react-hot-toast";
import { adjustTime } from "../utils/time.js";

const Admin = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getMyTasks = async () => {
      try {
        const request = await get("/api/task/all-tasks");
        const response = request.data;
        if (request.status === 200) {
          setTasks(response.tasks);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getMyTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      const request = await deleteTasks(`/api/task/any-tasks/${id}`);
      if (request.status === 200) {
        toast.success("Tarea Eliminada");
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      }
    } catch (error) {
      toast.error("Operacion Fallida. Intente Nuevamente");
    }
  };
  return (
    <div className="flex justify-center">
      <div className="container py-10">
        <h1 className="text-center">Todas las tareas</h1>
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
                  })}
                </p>
                <p>
                  Hora:{" "}
                  {adjustTime(task.createdAt, 0).toLocaleTimeString("es-AR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </p>
                <p>Creador: {task.user}</p>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="mt-5 bg-red-600 hover:bg-red-500 text-white pointer px-8 py-3 rounded-xl"
                >
                  Borrar Tarea
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div>No hay Tareas</div>
        )}
      </div>
    </div>
  );
};

export default Admin;
