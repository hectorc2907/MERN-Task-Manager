import { config } from "dotenv";

//iniciamos la funcion config para las variables de entorno
config();

//variables de entorno exportadas
export const PORT = process.env.PORT || 3000;
export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/test";
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
export const JWT_SECRET = process.env.JWT_SECRET