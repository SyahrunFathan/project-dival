const express = require("express");
const {
  createRumahSakit,
  deleteRumahSakit,
  getRumahSakit,
  getRumahSakitById,
  updateRumahSakit,
} = require("../../controllers/website/ControllersRumahSakit.js");
const Authentication = require("../../middleware/Authentication.js");

const router = express.Router();

router.use(Authentication);

router.get("/", getRumahSakit);
router.get("/:id", getRumahSakitById);
router.post("/", createRumahSakit);
router.delete("/:id", deleteRumahSakit);
router.patch("/:id", updateRumahSakit);

module.exports = router;
