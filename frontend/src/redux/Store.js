import storage from "redux-persist/lib/storage"; // Importa el almacenamiento local de Redux Persist
import { persistReducer, persistStore } from "redux-persist"; // Importa funciones de Redux Persist para manejar la persistencia
import AuthSlice from "./AuthSlice"; // Importa el slice de autenticación
import { configureStore } from "@reduxjs/toolkit"; // Importa la función para configurar el store de Redux

// Configuración de persistencia
const persistConfig = {
  key: "root", // Clave para almacenar el estado persistente
  storage, // Almacenamiento utilizado (localStorage en este caso)
};

// Crea un reductor persistido utilizando la configuración
const persistedReducer = persistReducer(persistConfig, AuthSlice);

// Configura el store de Redux
export const store = configureStore({
  reducer: {
    Auth: persistedReducer, // Añade el reductor persistido al store
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignora las acciones de persistencia que no son serializables
        ignoreActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// Crea un objeto persistor para manejar la persistencia del store
export const persistor = persistStore(store);
