import express from "express";
import { updateImage } from "../controllers/userControllers.js";
import { isUser } from "../middlewares/verifyToken.js";

//configuramos el enrutador
const router = express.Router();

//definimos las rutas
router.put("/", isUser, updateImage);

//exportamos el enrutador
export default router;
