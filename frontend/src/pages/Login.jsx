import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { post } from "../services/authServices.js";
import { SetUser } from "../redux/AuthSlice.js";

const Login = () => {
  const user = useSelector((state) => state.Auth);
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
        }
        dispatch(SetUser(response.user));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
          <p className="register-link">
            {/* Enlace para redirigir a la página de registro */}
            Not registered? <Link to={"/register"}>Register here</Link>
            {/* Enlace a la página de registro */}
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
