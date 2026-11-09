const router = require("express").Router();
const { requestCV } = require("../Controllers/CVController");
router.post("/request", requestCV);
module.exports = router;
