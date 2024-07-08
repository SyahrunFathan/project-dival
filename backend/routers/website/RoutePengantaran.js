import express from "express";
import { getSearchPengantaran } from "../../controllers/website/ControllersPengantaran.js";

const router = express.Router();

router.get("/", getSearchPengantaran);

export default router;
