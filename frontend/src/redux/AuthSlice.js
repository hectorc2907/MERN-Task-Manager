import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // Importa funciones de Redux Toolkit
import { get } from "../services/authServices.js"; // Importa la función de servicio para realizar solicitudes

// Crea una función asíncrona para actualizar el usuario
export const updateUser = createAsyncThunk("updateUser", async () => {
  try {
    // Realiza una solicitud GET para verificar el usuario
    const request = await get("/api/auth/user-check");
    const response = request.data.user; // Extrae el usuario de la respuesta
    return response; // Devuelve el usuario
  } catch (error) {
    throw error; // Lanza el error si ocurre
  }
});

// Estado inicial del slice
const initialState = {
  loading: null, // Indica si hay una carga en curso
  error: null, // Guarda cualquier error que ocurra
  user: null, // Guarda la información del usuario
};

// Crea el slice de autenticación
const AuthSlice = createSlice({
  name: "Auth", // Nombre del slice
  initialState: initialState, // Estado inicial
  reducers: {
    // Reducer para establecer el usuario
    SetUser: (state, action) => {
      state.user = action.payload; // Asigna el usuario al estado
    },
    // Reducer para cerrar sesión
    Logout: (state) => {
      state.user = null; // Limpia la información del usuario
      state.loading = null; // Limpia el estado de carga
      state.error = null; // Limpia cualquier error
    },
  },

  // Maneja los casos de las acciones asíncronas
  extraReducers: (builder) => {
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true; // Establece el estado de carga cuando la acción está pendiente
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = null; // Limpia el estado de carga
      state.user = action.payload; // Asigna el usuario recibido en la acción
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = null; // Limpia el estado de carga
      state.error = action.error.message; // Guarda el mensaje de error
      state.user = null; // Limpia la información del usuario
    });
  },
});

// Exporta las acciones del slice
export const { SetUser, Logout } = AuthSlice.actions;

// Exporta el reductor del slice
export default AuthSlice.reducer;
