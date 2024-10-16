import express from "express";
import cookieparser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import { FRONTEND_URL } from "./utils/envConfig.js";
import AuthRoutes from "./routes/authRoutes.js";

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
app.use("/api/auth", AuthRoutes);

//exportamos app para su uso
export { app };
