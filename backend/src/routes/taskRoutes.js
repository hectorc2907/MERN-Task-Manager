import express from "express";
import {
  createTask,
  deleteMyTask,
  deleteTask,
  getAllTasks,
  getMyTasks,
} from "../controllers/taskControllers.js";
import { isAdmin, isUser } from "../middlewares/verifyToken.js";

//configuramos el enrutador
const router = express.Router();

//definimos las rutas
router.post("/", isUser, createTask);
router.get("/", isUser, getMyTasks);
router.get("/all-tasks", isAdmin, getAllTasks);
router.delete("/:id", isUser, deleteMyTask);
router.delete("/any-tasks/:id", isAdmin, deleteTask);

//exportamos el enrutador
export default router;
