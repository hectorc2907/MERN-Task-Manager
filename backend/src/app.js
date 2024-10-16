import express from "express";
import cookieparser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import { FRONTEND_URL } from "./utils/envConfig.js";

//instancia de express
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(morgan("dev"));

//rutas
app.get("/", (req, res) => {
  res.send("Hello World");
});

//exportamos app para su uso
export { app };
