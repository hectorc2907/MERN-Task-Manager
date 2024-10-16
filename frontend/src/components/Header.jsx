import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { post } from "../services/authServices.js";
import { Logout } from "../redux/AuthSlice.js";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const user = useSelector((state) => state.Auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const request = await post("/api/auth/logout");

      if (request.status === 200) {
        dispatch(Logout());
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <header className="flex justify-center">
      <div className="container">
        <div className="flex justify-between">
          {user ? (
            <>
              {user.profileImage === null ? (
                <FaUserCircle />
              ) : (
                <image src={user.profileImage.url} />
              )}
              {user.role === "admin" ? (
                <div>
                  <Link to="/">New Task</Link>
                  <Link to="/admin">Admin</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              ) : (
                <div>
                  <Link>New Task</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </>
          ) : (
            <>
              <h1>Tasks</h1>
              <div>
                <Link to="/login">Login</Link>
                <Link to="/register">Registro</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
