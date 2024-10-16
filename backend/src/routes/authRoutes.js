import express from "express";
import { userLogin, userRegister } from "../controllers/authControllers.js";

//configuramos el enrutador
const router = express.Router();

//definimos las rutas
router.post("/register", userRegister);
router.post("/login", userLogin);

//exportamos el enrutador
export default router;
