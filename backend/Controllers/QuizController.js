const mongoose = require("mongoose");

const QuizQuestion = require("../Models/QuizQuestion");
const QuizScore = require("../Models/QuizScore");

// Helper: Validate and evaluate submitted answers
const evaluateQuiz = async (domain, answers) => {
  if (!domain || !Array.isArray(answers) || answers.length === 0) {
    throw new Error("Invalid quiz submission.");
  }

  if (answers.length > 30) {
    throw new Error("Maximum 30 questions are allowed.");
  }

  const questionIds = answers.map((answer) => answer.questionId);

  if (
    questionIds.some((id) => !mongoose.Types.ObjectId.isValid(id)) ||
    new Set(questionIds).size !== questionIds.length
  ) {
    throw new Error("Invalid or duplicate question IDs.");
  }

  const questions = await QuizQuestion.find({
    _id: { $in: questionIds },
    domain,
    active: true,
  });

  if (questions.length !== answers.length) {
    throw new Error("Some questions are invalid or unavailable.");
  }

  const questionMap = new Map(
    questions.map((question) => [question._id.toString(), question]),
  );

  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let unanswered = 0;

  const review = answers.map((answer) => {
    const question = questionMap.get(answer.questionId);
    const selectedOption = answer.selectedOption;

    if (selectedOption === null) {
      unanswered++;
    } else {
      if (
        !Number.isInteger(selectedOption) ||
        selectedOption < 0 ||
        selectedOption >= question.options.length
      ) {
        throw new Error("Invalid selected option.");
      }

      if (selectedOption === question.correctAnswer) {
        correctAnswers++;
      } else {
        incorrectAnswers++;
      }
    }

    return {
      questionId: question._id,
      question: question.question,
      options: question.options,
      selectedOption,
      correctAnswer: question.correctAnswer,
      isCorrect: selectedOption === question.correctAnswer,
    };
  });

  const totalQuestions = questions.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  return {
    domain,
    totalQuestions,
    correctAnswers,
    incorrectAnswers,
    unanswered,
    percentage,
    review,
  };
};

// 1. Get random quiz questions
const getQuestions = async (req, res) => {
  try {
    const { domain, count = 5 } = req.query;
    const questionCount = Number(count);

    if (
      !domain ||
      !Number.isInteger(questionCount) ||
      questionCount < 1 ||
      questionCount > 30
    ) {
      return res.status(400).json({
        success: false,
        message: "Provide a valid domain and question count (1-30).",
      });
    }

    const questions = await QuizQuestion.aggregate([
      {
        $match: {
          domain,
          active: true,
        },
      },
      {
        $sample: {
          size: questionCount,
        },
      },
      {
        $project: {
          question: 1,
          options: 1,
          domain: 1,
          difficulty: 1,
        },
      },
    ]);

    if (questions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No questions available for this domain.",
      });
    }

    return res.status(200).json({
      success: true,
      count: questions.length,
      questions,
    });
  } catch (error) {
    console.error("Get Questions Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch quiz questions.",
    });
  }
};

// 2. Submit quiz and calculate result
const submitQuiz = async (req, res) => {
  try {
    const { domain, answers } = req.body;

    const result = await evaluateQuiz(domain, answers);

    return res.status(200).json({
      success: true,
      message: "Quiz evaluated successfully.",
      result,
    });
  } catch (error) {
    console.error("Submit Quiz Error:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Unable to evaluate quiz.",
    });
  }
};

// 3. Save verified quiz score
const saveScore = async (req, res) => {
  try {
    const { domain, answers, timeTaken = 0 } = req.body;

    if (!Number.isInteger(timeTaken) || timeTaken < 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid time taken.",
      });
    }

    // Recalculate score on the server.
    // Never trust a score sent by the frontend.
    const result = await evaluateQuiz(domain, answers);

    const score = await QuizScore.create({
      userId: req.user._id,
      domain: result.domain,
      totalQuestions: result.totalQuestions,
      correctAnswers: result.correctAnswers,
      incorrectAnswers: result.incorrectAnswers,
      unanswered: result.unanswered,
      percentage: result.percentage,
      timeTaken,
    });

    return res.status(201).json({
      success: true,
      message: "Quiz score saved successfully.",
      score,
    });
  } catch (error) {
    console.error("Save Quiz Score Error:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Unable to save quiz score.",
    });
  }
};

// 4. Get logged-in user's quiz history
const getMyScores = async (req, res) => {
  try {
    const scores = await QuizScore.find({
      userId: req.user._id,
    })
      .sort({ completedAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      scores,
    });
  } catch (error) {
    console.error("Get Quiz History Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve quiz history.",
    });
  }
};

module.exports = {
  getQuestions,
  submitQuiz,
  saveScore,
  getMyScores,
};
