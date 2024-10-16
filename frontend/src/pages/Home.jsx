import { useEffect, useState } from "react";
import { get, deleteTasks, post } from "../services/tasksServices.js";
import { toast } from "react-hot-toast";
import { adjustTime } from "../utils/time.js";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const getMyTasks = async () => {
      try {
        const request = await get("/api/task");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await post("/api/task", { title });
      const response = request.data;
      if (request.status === 200) {
        setTasks([...tasks, response.task]);
        toast.success("Tarea Agregada Exitosamente");
        setTitle("");
        e.target.reset();
      }
    } catch (error) {
      toast.error("Operacion Fallida. Intente Nuevamente");
    }
  };

  const handleDelete = async (id) => {
    try {
      const request = await deleteTasks(`/api/task/${id}`);
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
        <div className="flex justify-center mb-5">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="task" className="text-center text-2xl">
              Nueva Tarea
            </label>
            <input
              type="text"
              id="task"
              onInput={(e) => setTitle(e.target.value)}
              className="w-full mt-5 px-4 py-2 text-lg border border-slate-300 rounded-md"
            />
            <div className="flex justify-center">
              <button
                type="submit"
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

export default Home;
