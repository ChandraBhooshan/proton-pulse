const mongoose = require("mongoose");

const PageViewSchema = new mongoose.Schema({
  visitorId: {
    type: String,
    required: true,
  },
  sessionId: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  viewedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PageView", PageViewSchema);
