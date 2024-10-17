// Importaciones de librerías y componentes
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";

// Componente de diseño para la sección de administración
const AdminLayouts = () => {
  // Seleccionar el usuario del estado global
  const user = useSelector((state) => state.Auth.user);
  const navigate = useNavigate();

  // Hook de efecto para verificar la autenticación del usuario
  useEffect(() => {
    // Redirigir al usuario a la página de login si no es administrador
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [user, navigate]); // Dependencias del efecto

  return (
    <>
      {/* Componente Header para mostrar la barra de navegación */}
      <Header />
      <main>
        {/* Renderiza los componentes hijos en la ruta correspondiente */}
        <Outlet />
      </main>
    </>
  );
};

// Exportar el componente para su uso en otras partes de la aplicación
export default AdminLayouts;
