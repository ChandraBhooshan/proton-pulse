const express = require("express");
const router = express.Router();

const {
  trackVisit,
  getVisitorSummary,
} = require("../Controllers/AnalyticsController");

router.post("/track", trackVisit);
router.get("/summary", getVisitorSummary);

module.exports = router;
