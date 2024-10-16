import { useState } from "react";
import { post } from "../services/authServices.js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await post("/api/auth/register", {
        name,
        email,
        password,
      });
      if (request.status === 200) {
        toast.success("Registro Exitoso");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Registro Fallido");
    }
  };
  return (
    <div className="flex justify-center items-center p-10">
      <div className="p-10 border border-slate-300 rounded-xl shadow-lg">
        <h2 className="flex justify-center my-10 text-4xl">Registro</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center my-2">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-slate-300 rounded-md px-2"
            />
          </div>
          <div className="flex flex-col items-center my-2">
            <label htmlFor="email">Correo Electronico</label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-slate-300 rounded-md px-2"
            />
          </div>
          <div className="flex flex-col items-center my-2">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-slate-300 rounded-md px-2"
            />
          </div>
          <div className="flex justify-center my-5">
            <button
              type="submit"
              className="bg-blue-800 hover:bg-blue-700 text-white pointer px-8 py-3 rounded-xl"
            >
              Registrar
            </button>
          </div>
          <p className="register-link">
            Already have an account?{" "}
            <Link to="/login" className="text-green-700 font-semibold">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
