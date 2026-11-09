const router = require("express").Router();
const { subscribeNewsletter } = require("../Controllers/NewsletterController");
router.post("/subscribe", subscribeNewsletter);
module.exports = router;
