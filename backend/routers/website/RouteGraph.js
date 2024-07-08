import express from "express";
import {
  createGraph,
  deleteGraph,
  getGraph,
} from "../../controllers/website/ControllersGraph.js";

const router = express.Router();

router.post("/", createGraph);
router.get("/", getGraph);
router.delete("/:id", deleteGraph);

export default router;
