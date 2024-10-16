import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { post } from "../services/authServices.js";
import { toast } from "react-hot-toast";
import { SetUser } from "../redux/AuthSlice.js";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await post("/api/auth/login", { email, password });
      const response = request.data;
      if (request.status === 200) {
        if (response.user) {
          navigate("/");
          toast.success(`Bienvenido ${response.user.name}`);
        }
        dispatch(SetUser(response.user));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center p-10">
      <div className="p-10 border border-slate-300 rounded-xl shadow-lg">
        <h2 className="flex justify-center my-10 text-4xl">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center my-5">
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
          <div className="flex flex-col items-center my-5">
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
              Login
            </button>
          </div>
          <p className="register-link">
            Not registered?{" "}
            <Link to={"/register"} className="text-green-700 font-semibold">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
