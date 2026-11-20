const mongoose = require("mongoose");

const VisitorSessionSchema = new mongoose.Schema({
  visitorId: {
    type: String,
    required: true,
  },
  sessionId: {
    type: String,
    required: true,
  },
  startedAt: {
    type: Date,
    default: Date.now,
  },
});

VisitorSessionSchema.index({ visitorId: 1, sessionId: 1 }, { unique: true });

module.exports = mongoose.model("VisitorSession", VisitorSessionSchema);
