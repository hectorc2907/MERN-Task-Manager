import express from "express";
import { createTask, getMyTasks } from "../controllers/taskControllers.js";
import { isUser } from "../middlewares/verifyToken.js";

//configuramos el enrutador
const router = express.Router();

//definimos las rutas
router.post("/", isUser, createTask);
router.get("/", isUser, getMyTasks);

//exportamos el enrutador
export default router;
