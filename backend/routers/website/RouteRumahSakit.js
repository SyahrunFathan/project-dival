import express from "express";
import {
  createRumahSakit,
  deleteRumahSakit,
  getRumahSakit,
  getRumahSakitById,
  updateRumahSakit,
} from "../../controllers/website/ControllersRumahSakit.js";

const router = express.Router();

router.get("/", getRumahSakit);
router.get("/:id", getRumahSakitById);
router.post("/", createRumahSakit);
router.delete("/:id", deleteRumahSakit);
router.patch("/:id", updateRumahSakit);

export default router;
