const router = require("express").Router();

const {
  sendCVOTP,
  verifyCVOTP,
} = require("../Controllers/CVEmailOTPController");

router.post("/send-otp", sendCVOTP);
router.post("/verify-otp", verifyCVOTP);

module.exports = router;
