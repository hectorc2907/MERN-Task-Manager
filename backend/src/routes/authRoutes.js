import express from "express";
import {
  userCheck,
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/authControllers.js";
import { isUser } from "../middlewares/verifyToken.js";

//configuramos el enrutador
const router = express.Router();

//definimos las rutas
router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/logout", userLogout);
router.get("/user-check", isUser, userCheck);

//exportamos el enrutador
export default router;
