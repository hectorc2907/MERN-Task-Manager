import express from "express";
import { userRegister } from "../controllers/authControllers.js";

//configuramos el enrutador
const router = express.Router();

//definimos las rutas
router.post("/register", userRegister);

//exportamos el enrutador
export default router;
