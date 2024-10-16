import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const user = useSelector((state) => state.Auth.user);
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
                  <button>Logout</button>
                </div>
              ) : (
                <div>
                  <Link>New Task</Link>
                  <button>Logout</button>
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
