import { useState } from "react"; // Importa el hook useState de React
import { post } from "../services/authServices.js"; // Importa la función para realizar la solicitud de registro
import { Link, useNavigate } from "react-router-dom"; // Importa Link para crear enlaces y useNavigate para redireccionar
import { toast } from "react-hot-toast"; // Importa el sistema de notificaciones

const Register = () => {
  const [name, setName] = useState(""); // Estado para almacenar el nombre del usuario
  const [email, setEmail] = useState(""); // Estado para almacenar el correo electrónico
  const [password, setPassword] = useState(""); // Estado para almacenar la contraseña
  const navigate = useNavigate(); // Inicializa navigate para redireccionar al usuario

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario
    try {
      // Realiza una solicitud de registro
      const request = await post("/api/auth/register", {
        name,
        email,
        password,
      });
      if (request.status === 200) {
        // Verifica si la respuesta es exitosa
        toast.success("Registro Exitoso"); // Muestra un mensaje de éxito
        navigate("/login"); // Redirecciona a la página de inicio de sesión
      }
    } catch (error) {
      toast.error("Registro Fallido"); // Muestra un mensaje de error en caso de fallo
    }
  };

  return (
    <div className="flex justify-center items-center p-10">
      <div className="p-10 border border-slate-300 rounded-xl shadow-lg">
        <h2 className="flex justify-center my-10 text-4xl">Registro</h2>
        <form onSubmit={handleSubmit}>
          {" "}
          {/* Maneja el envío del formulario */}
          <div className="flex flex-col items-center my-2">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)} // Actualiza el estado del nombre al escribir
              required // Campo obligatorio
              className="w-full border border-slate-300 rounded-md px-2"
            />
          </div>
          <div className="flex flex-col items-center my-2">
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
          <div className="flex flex-col items-center my-2">
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
              Registrar
            </button>
          </div>
          <p className="register-link">
            Already have an account?{" "}
            <Link to="/login" className="text-green-700 font-semibold">
              Login here
            </Link>{" "}
            {/* Enlace para iniciar sesión si el usuario ya tiene una cuenta */}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register; // Exporta el componente Register
