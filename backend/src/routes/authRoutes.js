import express from "express";
import {
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/authControllers.js";

//configuramos el enrutador
const router = express.Router();

//definimos las rutas
router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/logout", userLogout);

//exportamos el enrutador
export default router;
