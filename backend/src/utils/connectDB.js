// Importaciones necesarias
import mongoose from "mongoose"; // Importa la biblioteca Mongoose para trabajar con MongoDB
import { MONGODB_URI } from "./envConfig.js"; // Importa la URI de conexión desde el archivo de configuración de entorno

// Función para conectar a la base de datos MongoDB
export const connectDB = async () => {
  try {
    // Intenta establecer la conexión a MongoDB utilizando la URI proporcionada
    await mongoose.connect(MONGODB_URI);
  } catch (error) {
    // Si ocurre un error durante la conexión, imprímelo en la consola
    console.error(error);
  }
};

// Evento que se dispara cuando la conexión a MongoDB se establece correctamente
mongoose.connection.on("connected", () => {
  console.log("MongoDB is connected to", mongoose.connection.db.databaseName);
});
