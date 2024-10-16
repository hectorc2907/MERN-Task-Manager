import { connectDB } from "./utils/db.js";
import { PORT } from "./utils/config.js";

connectDB();
console.log("Server on port:", PORT);
