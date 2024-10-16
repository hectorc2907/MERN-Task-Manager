import { connectDB } from "./utils/connectDB.js";
import { PORT } from "./utils/envConfig.js";

connectDB();
console.log("Server on port:", PORT);
