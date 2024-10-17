import { useState } from "react"; // Importa el hook useState de React
import { useDispatch } from "react-redux"; // Importa el hook useDispatch para manejar el estado global
import { useNavigate, Link } from "react-router-dom"; // Importa useNavigate para redireccionar y Link para crear enlaces
import { post } from "../services/authServices.js"; // Importa la función para realizar la solicitud de inicio de sesión
import { toast } from "react-hot-toast"; // Importa el sistema de notificaciones
import { SetUser } from "../redux/AuthSlice.js"; // Importa la acción para establecer el usuario en el estado global

const Login = () => {
  const dispatch = useDispatch(); // Inicializa dispatch para enviar acciones a Redux
  const [email, setEmail] = useState(""); // Estado para almacenar el correo electrónico
  const [password, setPassword] = useState(""); // Estado para almacenar la contraseña
  const navigate = useNavigate(); // Inicializa navigate para redireccionar al usuario

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario
    try {
      // Realiza una solicitud de inicio de sesión
      const request = await post("/api/auth/login", { email, password });
      const response = request.data; // Obtiene los datos de la respuesta
      if (request.status === 200) {
        // Verifica si la respuesta es exitosa
        if (response.user) {
          navigate("/"); // Redirecciona a la página principal si el inicio de sesión es exitoso
          toast.success(`Bienvenido ${response.user.name}`); // Muestra un mensaje de éxito
        }
        dispatch(SetUser(response.user)); // Establece el usuario en el estado global
      }
    } catch (error) {
      console.log(error); // Manejo de errores en caso de fallo
    }
  };

  return (
    <div className="flex justify-center items-center p-10">
      <div className="p-10 border border-slate-300 rounded-xl shadow-lg">
        <h2 className="flex justify-center my-10 text-4xl">Login</h2>
        <form onSubmit={handleSubmit}>
          {" "}
          {/* Maneja el envío del formulario */}
          <div className="flex flex-col items-center my-5">
            <label htmlFor="email">Correo Electronico</label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)} // Actualiza el estado del correo electrónico al escribir
              required // Campo obligatorio
              className="w-full border border-slate-300 rounded-md px-2"
            />
          </div>
          <div className="flex flex-col items-center my-5">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de la contraseña al escribir
              required // Campo obligatorio
              className="w-full border border-slate-300 rounded-md px-2"
            />
          </div>
          <div className="flex justify-center my-5">
            <button
              type="submit" // Establece el botón como de tipo submit
              className="bg-blue-800 hover:bg-blue-700 text-white pointer px-8 py-3 rounded-xl"
            >
              Login
            </button>
          </div>
          <p className="register-link">
            Not registered?{" "}
            <Link to={"/register"} className="text-green-700 font-semibold">
              Register here
            </Link>{" "}
            {/* Enlace para registrarse */}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login; // Exporta el componente Login
