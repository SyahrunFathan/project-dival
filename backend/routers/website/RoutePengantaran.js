const express = require("express");
const {
  createPengantaran,
  deletePengantaran,
  getAllData,
  getCountAll,
  getSearchPengantaran,
} = require("../../controllers/website/ControllersPengantaran.js");
const Authentication = require("../../middleware/Authentication.js");

const router = express.Router();

router.use(Authentication);

router.get("/", getSearchPengantaran);
router.get("/all", getAllData);
router.get("/count-all", getCountAll);
router.post("/", createPengantaran);
router.delete("/:id", deletePengantaran);

module.exports = router;
