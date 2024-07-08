import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import db from "./configs/Database.js";
import RouteRumahSakit from "./routers/website/RouteRumahSakit.js";
import RouteGraph from "./routers/website/RouteGraph.js";
import RouteDarah from "./routers/website/RouteDarah.js";
import RoutePengantaran from "./routers/website/RoutePengantaran.js";
// import ModelCreate from "./models/ModelPengantaran.js";

const app = express();

try {
  await db.authenticate();
  // await ModelCreate.sync();
} catch (error) {
  console.log(error);
}

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use(express.json());

app.use("/rumah-sakit", RouteRumahSakit);
app.use("/graph", RouteGraph);
app.use("/darah", RouteDarah);
app.use("/pengantaran", RoutePengantaran);

app.listen(5001, () => console.log("Server up running at port 5001...."));
