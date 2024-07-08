import express from "express";
import {
  createDarah,
  deleteDarah,
  getDarah,
  getDarahById,
  updateDarah,
} from "../../controllers/website/ControllersDarah.js";

const router = express.Router();

router.get("/", getDarah);
router.post("/", createDarah);
router.get("/:id", getDarahById);
router.put("/:id", updateDarah);
router.delete("/:id", deleteDarah);

export default router;
