import express from "express";
import { createTask } from "../controllers/taskControllers.js";
import { isUser } from "../middlewares/verifyToken.js";

//configuramos el enrutador
const router = express.Router();

//definimos las rutas
router.post("/", isUser, createTask);

//exportamos el enrutador
export default router;
