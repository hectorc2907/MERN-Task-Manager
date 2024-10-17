import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { get, post, put } from "../services/authServices.js";
import { SetUser, Logout } from "../redux/AuthSlice.js";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  // Obtiene el usuario de Redux y configura el enrutador y el despachador
  const user = useSelector((state) => state.Auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Estado para controlar el modal y la imagen seleccionada
  const [isModalOpen, setIsModalOpen] = useState(false); // Inicializa el estado del modal como falso
  const [selectedImage, setSelectedImage] = useState(null); // Estado para almacenar la imagen seleccionada

  // Maneja el cierre de sesión del usuario
  const handleLogout = async () => {
    try {
      const request = await post("/api/auth/logout");

      if (request.status === 200) {
        dispatch(Logout()); // Despacha la acción de logout en Redux
        navigate("/login"); // Redirige al usuario a la página de login
      }
    } catch (error) {
      console.error(error); // Manejo de errores en caso de fallo en el logout
    }
  };

  // Abre el modal para cambiar la imagen de perfil
  const handleProfileClick = () => {
    setIsModalOpen(true);
  };

  // Cierra el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Sube la imagen seleccionada al servidor
  const uploadImage = async () => {
    if (!selectedImage) {
      console.error("No hay imagen seleccionada."); // Mensaje de error si no hay imagen
      return;
    }

    try {
      const response = await put("/api/profile", selectedImage); // Enviamos la imagen usando el FormData
      if (response.status === 200) {
        // Actualiza el estado del usuario en Redux después de subir la imagen
        const userData = await get("/api/auth/user-check");
        dispatch(SetUser(userData.data.user)); // Despacha la acción para actualizar el usuario
        closeModal(); // Cierra el modal después de subir la imagen
      }
    } catch (error) {
      console.error("Error al subir la imagen", error); // Manejo de errores durante la subida de imagen
    }
  };

  return (
    <header className="flex justify-center bg-blue-900 text-white">
      <div className="container py-5">
        <div className="flex justify-between items-center">
          {user ? (
            <>
              {/* Muestra el ícono de usuario o la imagen de perfil */}
              {user.profileImage === null ? (
                <FaUserCircle
                  className="w-16 h-16"
                  onClick={handleProfileClick}
                />
              ) : (
                <img
                  src={user.profileImage.url}
                  className="w-16 h-16 rounded-full cursor-pointer"
                  onClick={handleProfileClick}
                />
              )}
              {/* Muestra los enlaces dependiendo del rol del usuario */}
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

      {/* Modal para cambiar la imagen de perfil */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <h2 className="text-lg text-black font-semibold">
              Cambiar Foto de Perfil
            </h2>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0]; // Captura el archivo seleccionado
                setSelectedImage(file); // Establece la imagen seleccionada
              }}
            />
            <button
              onClick={uploadImage} // Llama a la función para subir la imagen
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Subir Imagen
            </button>
            <button
              onClick={closeModal} // Cierra el modal
              className="mt-2 bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
