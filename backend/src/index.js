import { connectDB } from "./utils/connectDB.js";
import { app } from "./app.js";
import { PORT } from "./utils/envConfig.js";

//realizamos la conexion con la base de datos
connectDB();
//configuramos app para que escuche al puerto correspondiente
app.listen(PORT);
//mensaje de informacion sobre el puerto conectado
console.log("Server on port:", PORT);
