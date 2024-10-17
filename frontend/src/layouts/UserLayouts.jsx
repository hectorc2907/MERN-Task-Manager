// Importaciones de librerías y componentes
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";

// Componente de diseño para la sección de usuarios autenticados
const UserLayouts = () => {
  // Seleccionar el usuario del estado global
  const user = useSelector((state) => state.Auth.user);
  const navigate = useNavigate(); // Crear función de navegación

  // Hook de efecto para redirigir usuarios no autenticados
  useEffect(() => {
    // Redirigir a la página de login si no hay usuario autenticado
    if (!user) {
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
export default UserLayouts;
