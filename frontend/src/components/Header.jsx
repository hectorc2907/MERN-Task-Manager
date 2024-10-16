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
    <header className="flex justify-center bg-blue-900 text-white">
      <div className="container py-5">
        <div className="flex justify-between items-center">
          {user ? (
            <>
              {user.profileImage === null ? (
                <FaUserCircle className="w-16 h-16" />
              ) : (
                <image src={user.profileImage.url} className="w-16 h-16" />
              )}
              {user.role === "admin" ? (
                <div className="flex gap-5">
                  <Link className="hover:text-slate-300" to="/">
                    New Task
                  </Link>
                  <Link className="hover:text-slate-300" to="/admin">
                    Admin
                  </Link>
                  <button
                    className="hover:text-slate-300"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-5">
                  <Link className="hover:text-slate-300" to="/">
                    New Task
                  </Link>
                  <button
                    className="hover:text-slate-300"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <h1 className="text-5xl font-semibold italic py-2">Tasks</h1>
              <div className="flex gap-5">
                <Link to="/login" className="hover:text-slate-300">
                  Login
                </Link>
                <Link to="/register" className="hover:text-slate-300">
                  Registro
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
