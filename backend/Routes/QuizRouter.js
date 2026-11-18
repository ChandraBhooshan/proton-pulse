const express = require("express");
const router = express.Router();

const ensureAuthenticated = require("../Middlewares/Auth");

const {
  getQuestions,
  submitQuiz,
  saveScore,
  getMyScores,
} = require("../Controllers/QuizController");

// Fetch random quiz questions
router.get("/questions", ensureAuthenticated, getQuestions);

// Submit answers and calculate results
router.post("/submit", ensureAuthenticated, submitQuiz);

// Save quiz score
router.post("/save-score", ensureAuthenticated, saveScore);

// Retrieve logged-in user's quiz history
router.get("/my-scores", ensureAuthenticated, getMyScores);

module.exports = router;
