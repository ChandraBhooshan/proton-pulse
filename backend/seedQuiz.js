require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./Models/db");
const QuizQuestion = require("./Models/QuizQuestion");

// Insert your existing 15 Computer Science questions here.
// Keep the original question text and options unchanged.
//
// Required format:
// {
//   domain: "Computer Science",
//   question: "Your question",
//   options: ["Option A", "Option B", "Option C", "Option D"],
//   correctAnswer: 1, // Zero-based option index
//   difficulty: "Easy"
// }

const questions = [
  // Add the 15 existing questions here.
  {
    domain: "Computer Science",
    question: "Which data structure follows LIFO?",
    options: ["Queue", "Stack", "Tree", "Graph"],
    correctAnswer: 1,
    difficulty: "Easy",
  },
  {
    domain: "Computer Science",
    question: "Which language is primarily used for styling web pages?",
    options: ["HTML", "Python", "CSS", "SQL"],
    correctAnswer: 2,
    difficulty: "Easy",
  },
  {
    domain: "Computer Science",
    question: "What does CPU stand for?",
    options: [
      "Central Processing Unit",
      "Computer Personal Unit",
      "Central Program Utility",
      "Control Processing User",
    ],
    correctAnswer: 0,
    difficulty: "Easy",
  },
  {
    domain: "Computer Science",
    question: "Which data structure follows FIFO?",
    options: ["Stack", "Queue", "Heap", "Tree"],
    correctAnswer: 1,
    difficulty: "Easy",
  },
  {
    domain: "Computer Science",
    question: "What is the average time complexity of binary search?",
    options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
    correctAnswer: 2,
    difficulty: "Easy",
  },
  {
    domain: "Computer Science",
    question: "Which of these is a relational database?",
    options: ["MongoDB", "MySQL", "Redis", "Neo4j"],
    correctAnswer: 1,
    difficulty: "Easy",
  },
  {
    domain: "Computer Science",
    question: "Which protocol is commonly used for secure web browsing?",
    options: ["HTTP", "FTP", "HTTPS", "SMTP"],
    correctAnswer: 2,
    difficulty: "Easy",
  },
  {
    domain: "Computer Science",
    question: "Which memory is volatile?",
    options: ["ROM", "Hard disk", "RAM", "SSD"],
    correctAnswer: 2,
    difficulty: "Easy",
  },
  {
    domain: "Computer Science",
    question:
      "Which traversal visits the root between left and right subtrees?",
    options: ["Preorder", "Inorder", "Postorder", "Level order"],
    correctAnswer: 1,
    difficulty: "Easy",
  },
  {
    domain: "Computer Science",
    question: "Which operating system is open source?",
    options: ["Windows", "macOS", "Linux", "iOS"],
    correctAnswer: 2,
    difficulty: "Easy",
  },
  {
    domain: "Computer Science",
    question: "What does SQL stand for?",
    options: [
      "Structured Query Language",
      "Simple Question Logic",
      "System Query Link",
      "Sequential Queue Language",
    ],
    correctAnswer: 0,
    difficulty: "Easy",
  },
  {
    domain: "Computer Science",
    question: "Which component performs arithmetic operations?",
    options: ["CU", "ALU", "RAM", "ROM"],
    correctAnswer: 1,
    difficulty: "Easy",
  },
  {
    domain: "Computer Science",
    question:
      "Which algorithm is commonly used for shortest paths with non-negative edge weights?",
    options: ["Merge Sort", "Dijkstra's Algorithm", "Binary Search", "KMP"],
    correctAnswer: 1,
    difficulty: "Easy",
  },
  {
    domain: "Computer Science",
    question: "What is the smallest unit of data?",
    options: ["Byte", "Bit", "Kilobyte", "Word"],
    correctAnswer: 1,
    difficulty: "Easy",
  },
  {
    domain: "Computer Science",
    question: "Which Git command downloads remote changes and integrates them?",
    options: ["git push", "git commit", "git pull", "git init"],
    correctAnswer: 2,
    difficulty: "Easy",
  },
];

async function seedQuestions() {
  try {
    await connectDB();

    if (questions.length === 0) {
      throw new Error("No questions provided.");
    }

    for (const question of questions) {
      if (
        !question.question ||
        !Array.isArray(question.options) ||
        !Number.isInteger(question.correctAnswer) ||
        question.correctAnswer < 0 ||
        question.correctAnswer >= question.options.length
      ) {
        throw new Error(`Invalid question or answer: ${question.question}`);
      }
    }

    // Prevent duplicate insertion when rerunning the script.
    await QuizQuestion.deleteMany({
      domain: "Computer Science",
    });

    await QuizQuestion.insertMany(questions);

    console.log(`Successfully inserted ${questions.length} questions.`);
  } catch (error) {
    console.error("Quiz seeding failed:", error.message);
  } finally {
    await mongoose.connection.close();
  }
}

seedQuestions();
