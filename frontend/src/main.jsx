// Importaciones de librerías y componentes
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/Store.js";
import { PersistGate } from "redux-persist/integration/react";

// Crear la raíz de la aplicación
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Proveedor de Redux para acceder al store */}
    <Provider store={store}>
      {/* PersistGate para manejar la persistencia del estado */}
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
