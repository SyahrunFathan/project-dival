import express from "express";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
dotenv.config();

import db from "./configs/Database.js";
import RouteRumahSakit from "./routers/website/RouteRumahSakit.js";
import RouteGraph from "./routers/website/RouteGraph.js";
import RouteDarah from "./routers/website/RouteDarah.js";
import RoutePengantaran from "./routers/website/RoutePengantaran.js";
import RouteUser from "./routers/website/RouteUser.js";
// import ModelCreate from "./models/ModelPengantaran.js";

const app = express();

try {
  await db.authenticate();
  // await ModelCreate.sync();
} catch (error) {
  console.log(error);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());

app.use("/rumah-sakit", RouteRumahSakit);
app.use("/graph", RouteGraph);
app.use("/darah", RouteDarah);
app.use("/pengantaran", RoutePengantaran);
app.use("/user", RouteUser);

app.listen(5001, () => console.log("Server up running at port 5001...."));
