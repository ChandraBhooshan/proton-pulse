const mongoose = require("mongoose");

const QuizScoreSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      index: true,
    },

    domain: {
      type: String,
      required: true,
    },

    totalQuestions: {
      type: Number,
      required: true,
    },

    correctAnswers: {
      type: Number,
      required: true,
    },

    incorrectAnswers: {
      type: Number,
      required: true,
    },

    unanswered: {
      type: Number,
      required: true,
    },

    percentage: {
      type: Number,
      required: true,
    },

    timeTaken: {
      type: Number,
      default: 0,
    },

    completedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

QuizScoreSchema.index({ userId: 1, completedAt: -1 });

module.exports = mongoose.model("QuizScore", QuizScoreSchema);
