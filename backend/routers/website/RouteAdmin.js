const express = require("express");
const {
  LoginAdmin,
  createAdmin,
  removeToken,
} = require("../../controllers/website/ControllerAdmin.js");
const Authentication = require("../../middleware/Authentication.js");

const router = express.Router();

router.post("/login", LoginAdmin);
router.post("/create", Authentication, createAdmin);
router.delete("/remove-token/:id", removeToken);

module.exports = router;
