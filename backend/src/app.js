import express from "express";
import cookieparser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import { FRONTEND_URL } from "./utils/envConfig.js";
import AuthRoutes from "./routes/authRoutes.js";
import TaskRoutes from "./routes/taskRoutes.js";
import UserRoutes from "./routes/userRoutes.js";

//instancia de express
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(fileUpload({ tempFileDir: "./upload", useTempFiles: true }));
app.use(morgan("dev"));

//rutas
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/auth", AuthRoutes);
app.use("/api/task", TaskRoutes);
app.use("/api/profile", UserRoutes);

//exportamos app para su uso
export { app };
