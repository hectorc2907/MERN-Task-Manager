import { config } from "dotenv";

//iniciamos la funcion config para las variables de entorno
config();

//variables de entorno exportadas
export const PORT = process.env.PORT || 3000;
export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/test";
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
export const JWT_SECRET = process.env.JWT_SECRET;
export const CLOUD_NAME = process.env.CLOUD_NAME;
export const API_KEY = process.env.API_KEY;
export const API_SECRET = process.env.API_SECRET;
