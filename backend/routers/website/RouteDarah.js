const express = require("express");
const {
  createDarah,
  deleteDarah,
  getDarah,
  getDarahById,
  updateDarah,
} = require("../../controllers/website/ControllersDarah.js");
const Authentication = require("../../middleware/Authentication.js");

const router = express.Router();

router.use(Authentication);

router.get("/", getDarah);
router.post("/", createDarah);
router.get("/:id", getDarahById);
router.put("/:id", updateDarah);
router.delete("/:id", deleteDarah);

module.exports = router;
