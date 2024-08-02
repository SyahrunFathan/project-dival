const express = require("express");
const {
  Login,
  removeToken,
  getUserPengantaran,
  updatePengantaranByUser,
  getDataPengantaranBySearch,
} = require("../../controllers/mobile/ControllerUser");
const Authentication = require("../../middleware/Authentication");

const router = express.Router();

router.post("/login", Login);
router.delete("/remove-token/:id", removeToken);
router.get("/pengantaran/user-id/:id", Authentication, getUserPengantaran);
router.patch(
  "/pengantaran/user-id/update/:id",
  Authentication,
  updatePengantaranByUser
);
router.get("/pengantaran/user-id", Authentication, getDataPengantaranBySearch);

module.exports = router;
