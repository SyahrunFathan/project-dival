const express = require("express");
const {
  createGraph,
  deleteGraph,
  getGraph,
  postDirection,
} = require("../../controllers/website/ControllersGraph.js");
const Authentication = require("../../middleware/Authentication.js");

const router = express.Router();

router.use(Authentication);

router.post("/", createGraph);
router.get("/", getGraph);
router.delete("/:id", deleteGraph);
router.post("/direction", postDirection);

module.exports = router;
