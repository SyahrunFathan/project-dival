const express = require("express");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
dotenv.config();

const db = require("./configs/Database.js");
const RouteRumahSakit = require("./routers/website/RouteRumahSakit.js");
const RouteGraph = require("./routers/website/RouteGraph.js");
const RouteDarah = require("./routers/website/RouteDarah.js");
const RoutePengantaran = require("./routers/website/RoutePengantaran.js");
const RouteUser = require("./routers/website/RouteUser.js");
const RouteUserMobile = require("./routers/mobile/RouteUser.js");
const RouteAdmin = require("./routers/website/RouteAdmin.js");

const app = express();

try {
  db.authenticate();
  // await ModelCreate.sync();
} catch (error) {
  console.log(error);
}

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
app.use("/user-mobile", RouteUserMobile);
app.use("/admin", RouteAdmin);

app.listen(5001, () => console.log("Server up running at port 5001...."));
