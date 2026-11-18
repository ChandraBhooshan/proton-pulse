const mongoose = require("mongoose");

const QuizQuestionSchema = new mongoose.Schema(
  {
    domain: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    options: {
      type: [String],
      required: true,
      validate: {
        validator: (options) => options.length >= 2,
        message: "A question must have at least two options.",
      },
    },

    correctAnswer: {
      type: Number,
      required: true,
      min: 0,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

QuizQuestionSchema.index({ domain: 1, active: 1 });

module.exports = mongoose.model("QuizQuestion", QuizQuestionSchema);
