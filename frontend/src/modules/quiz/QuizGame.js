// // import React, { useState } from "react";
// // import "./Quiz.css";
// // import { useNavigate } from "react-router-dom";

// // const questionBank = {
// //   "Computer Science": [
// //     {
// //       question: "Which data structure follows LIFO?",
// //       options: ["Queue", "Stack", "Tree", "Graph"],
// //       answer: "Stack",
// //     },
// //     {
// //       question: "Which language is primarily used for styling web pages?",
// //       options: ["HTML", "Python", "CSS", "SQL"],
// //       answer: "CSS",
// //     },
// //     {
// //       question: "What does CPU stand for?",
// //       options: [
// //         "Central Processing Unit",
// //         "Computer Personal Unit",
// //         "Central Program Utility",
// //         "Control Processing User",
// //       ],
// //       answer: "Central Processing Unit",
// //     },
// //     {
// //       question: "Which data structure follows FIFO?",
// //       options: ["Stack", "Queue", "Heap", "Tree"],
// //       answer: "Queue",
// //     },
// //     {
// //       question: "What is the average time complexity of binary search?",
// //       options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
// //       answer: "O(log n)",
// //     },
// //     {
// //       question: "Which of these is a relational database?",
// //       options: ["MongoDB", "MySQL", "Redis", "Neo4j"],
// //       answer: "MySQL",
// //     },
// //     {
// //       question: "Which protocol is commonly used for secure web browsing?",
// //       options: ["HTTP", "FTP", "HTTPS", "SMTP"],
// //       answer: "HTTPS",
// //     },
// //     {
// //       question: "Which memory is volatile?",
// //       options: ["ROM", "Hard disk", "RAM", "SSD"],
// //       answer: "RAM",
// //     },
// //     {
// //       question:
// //         "Which traversal visits the root between left and right subtrees?",
// //       options: ["Preorder", "Inorder", "Postorder", "Level order"],
// //       answer: "Inorder",
// //     },
// //     {
// //       question: "Which operating system is open source?",
// //       options: ["Windows", "macOS", "Linux", "iOS"],
// //       answer: "Linux",
// //     },
// //     {
// //       question: "What does SQL stand for?",
// //       options: [
// //         "Structured Query Language",
// //         "Simple Question Logic",
// //         "System Query Link",
// //         "Sequential Queue Language",
// //       ],
// //       answer: "Structured Query Language",
// //     },
// //     {
// //       question: "Which component performs arithmetic operations?",
// //       options: ["CU", "ALU", "RAM", "ROM"],
// //       answer: "ALU",
// //     },
// //     {
// //       question:
// //         "Which algorithm is commonly used for shortest paths with non-negative edge weights?",
// //       options: ["Merge Sort", "Dijkstra's Algorithm", "Binary Search", "KMP"],
// //       answer: "Dijkstra's Algorithm",
// //     },
// //     {
// //       question: "What is the smallest unit of data?",
// //       options: ["Byte", "Bit", "Kilobyte", "Word"],
// //       answer: "Bit",
// //     },
// //     {
// //       question:
// //         "Which Git command downloads remote changes and integrates them?",
// //       options: ["git push", "git commit", "git pull", "git init"],
// //       answer: "git pull",
// //     },
// //   ],
// // };

// // function QuizGame({ config, onSubmit, onExit }) {
// //   const availableQuestions = questionBank[config.domain] || [];

// //   const questions = availableQuestions.slice(
// //     0,
// //     Math.min(config.questionCount, availableQuestions.length),
// //   );

// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [answers, setAnswers] = useState({});
// //   const [showSubmit, setShowSubmit] = useState(false);

// //   if (questions.length === 0) {
// //     return (
// //       <div className="quiz-game-page">
// //         <div className="quiz-game-card">
// //           <h2>Questions unavailable</h2>
// //           <p>No questions have been added for {config.domain} yet.</p>
// //           <button className="quiz-back-button" onClick={onExit}>
// //             Go Back
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const currentQuestion = questions[currentIndex];
// //   const selectedAnswer = answers[currentIndex];
// //   const navigate = useNavigate();

// //   const selectAnswer = (option) => {
// //     setAnswers((previous) => ({
// //       ...previous,
// //       [currentIndex]: option,
// //     }));
// //   };

// //   const handleSubmit = () => {
// //     navigate("/work/quiz/result", {
// //       state: {
// //         result: finalResult,
// //       },
// //     });
// //     const correct = questions.reduce((total, question, index) => {
// //       return total + (answers[index] === question.answer ? 1 : 0);
// //     }, 0);

// //     const answered = Object.keys(answers).length;

// //     onSubmit({
// //       domain: config.domain,
// //       total: questions.length,
// //       correct,
// //       incorrect: answered - correct,
// //       unanswered: questions.length - answered,
// //       percentage: Math.round((correct / questions.length) * 100),
// //       questions,
// //       answers,
// //     });
// //   };

// //   return (
// //     <div className="quiz-game-page">
// //       <div className="quiz-game-card">
// //         <div className="quiz-game-header">
// //           <button className="quiz-back-button" onClick={onExit}>
// //             ← Exit
// //           </button>

// //           <span>{config.domain}</span>
// //         </div>

// //         <h2>Trivia Challenge</h2>

// //         <div className="quiz-progress-track">
// //           <div
// //             className="quiz-progress-fill"
// //             style={{
// //               width: `${((currentIndex + 1) / questions.length) * 100}%`,
// //             }}
// //           />
// //         </div>

// //         <p className="quiz-question-number">
// //           Question {currentIndex + 1} of {questions.length}
// //         </p>

// //         <h3 className="quiz-question">{currentQuestion.question}</h3>

// //         <div className="quiz-answer-grid">
// //           {currentQuestion.options.map((option) => (
// //             <button
// //               key={option}
// //               className={`quiz-answer-option ${
// //                 selectedAnswer === option ? "selected" : ""
// //               }`}
// //               onClick={() => selectAnswer(option)}
// //             >
// //               {option}
// //             </button>
// //           ))}
// //         </div>

// //         <div className="quiz-game-navigation">
// //           <button
// //             className="quiz-nav-button"
// //             disabled={currentIndex === 0}
// //             onClick={() => setCurrentIndex((index) => index - 1)}
// //           >
// //             ← Previous
// //           </button>

// //           {currentIndex < questions.length - 1 ? (
// //             <button
// //               className="quiz-nav-button primary"
// //               onClick={() => setCurrentIndex((index) => index + 1)}
// //             >
// //               Next →
// //             </button>
// //           ) : (
// //             <button
// //               className="quiz-nav-button submit"
// //               onClick={() => setShowSubmit(true)}
// //             >
// //               Submit Quiz
// //             </button>
// //           )}
// //         </div>

// //         {showSubmit && (
// //           <div className="quiz-confirm-overlay">
// //             <div className="quiz-confirm-card">
// //               <h3>Submit your quiz?</h3>
// //               <p>
// //                 You answered {Object.keys(answers).length} out of{" "}
// //                 {questions.length} questions.
// //               </p>

// //               <button className="quiz-start-button" onClick={handleSubmit}>
// //                 Confirm Submission
// //               </button>

// //               <button
// //                 className="quiz-back-button"
// //                 onClick={() => setShowSubmit(false)}
// //               >
// //                 Continue Quiz
// //               </button>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default QuizGame;
// // last change
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import "./Quiz.css";

// const questionBank = {
//   "Computer Science": [
//     {
//       question: "Which data structure follows LIFO?",
//       options: ["Queue", "Stack", "Tree", "Graph"],
//       answer: "Stack",
//     },
//     {
//       question: "Which language is primarily used for styling web pages?",
//       options: ["HTML", "Python", "CSS", "SQL"],
//       answer: "CSS",
//     },
//     {
//       question: "What does CPU stand for?",
//       options: [
//         "Central Processing Unit",
//         "Computer Personal Unit",
//         "Central Program Utility",
//         "Control Processing User",
//       ],
//       answer: "Central Processing Unit",
//     },
//     {
//       question: "Which data structure follows FIFO?",
//       options: ["Stack", "Queue", "Heap", "Tree"],
//       answer: "Queue",
//     },
//     {
//       question: "What is the average time complexity of binary search?",
//       options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
//       answer: "O(log n)",
//     },
//     {
//       question: "Which of these is a relational database?",
//       options: ["MongoDB", "MySQL", "Redis", "Neo4j"],
//       answer: "MySQL",
//     },
//     {
//       question: "Which protocol is commonly used for secure web browsing?",
//       options: ["HTTP", "FTP", "HTTPS", "SMTP"],
//       answer: "HTTPS",
//     },
//     {
//       question: "Which memory is volatile?",
//       options: ["ROM", "Hard disk", "RAM", "SSD"],
//       answer: "RAM",
//     },
//     {
//       question:
//         "Which traversal visits the root between left and right subtrees?",
//       options: ["Preorder", "Inorder", "Postorder", "Level order"],
//       answer: "Inorder",
//     },
//     {
//       question: "Which operating system is open source?",
//       options: ["Windows", "macOS", "Linux", "iOS"],
//       answer: "Linux",
//     },
//     {
//       question: "What does SQL stand for?",
//       options: [
//         "Structured Query Language",
//         "Simple Question Logic",
//         "System Query Link",
//         "Sequential Queue Language",
//       ],
//       answer: "Structured Query Language",
//     },
//     {
//       question: "Which component performs arithmetic operations?",
//       options: ["CU", "ALU", "RAM", "ROM"],
//       answer: "ALU",
//     },
//     {
//       question:
//         "Which algorithm is commonly used for shortest paths with non-negative edge weights?",
//       options: ["Merge Sort", "Dijkstra's Algorithm", "Binary Search", "KMP"],
//       answer: "Dijkstra's Algorithm",
//     },
//     {
//       question: "What is the smallest unit of data?",
//       options: ["Byte", "Bit", "Kilobyte", "Word"],
//       answer: "Bit",
//     },
//     {
//       question:
//         "Which Git command downloads remote changes and integrates them?",
//       options: ["git push", "git commit", "git pull", "git init"],
//       answer: "git pull",
//     },
//   ],
// };

// function QuizGame() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Configuration received from QuizSetup.
//   const config = location.state;

//   // Hooks must be declared before conditional returns.
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [showSubmit, setShowSubmit] = useState(false);

//   if (!config?.domain || !config?.questionCount) {
//     return (
//       <div className="quiz-game-page">
//         <div className="quiz-game-card">
//           <h2>Quiz configuration missing</h2>
//           <button
//             className="quiz-back-button"
//             onClick={() => navigate("/work/quiz/setup")}
//           >
//             Go to Quiz Setup
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const availableQuestions = questionBank[config.domain] || [];

//   const questions = availableQuestions.slice(
//     0,
//     Math.min(config.questionCount, availableQuestions.length),
//   );

//   const handleExit = () => {
//     navigate("/work/quiz/setup");
//     // navigate("/work");

//   };

//   if (questions.length === 0) {
//     return (
//       <div className="quiz-game-page">
//         <div className="quiz-game-card">
//           <h2>Questions unavailable</h2>
//           <p>No questions have been added for {config.domain} yet.</p>
//           <button className="quiz-back-button" onClick={handleExit}>
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const currentQuestion = questions[currentIndex];
//   const selectedAnswer = answers[currentIndex];

//   const selectAnswer = (option) => {
//     setAnswers((previous) => ({
//       ...previous,
//       [currentIndex]: option,
//     }));
//   };

//   const handleSubmit = () => {
//     const correct = questions.reduce((total, question, index) => {
//       return total + (answers[index] === question.answer ? 1 : 0);
//     }, 0);

//     const answered = Object.keys(answers).length;

//     const finalResult = {
//       domain: config.domain,
//       total: questions.length,
//       correct,
//       incorrect: answered - correct,
//       unanswered: questions.length - answered,
//       percentage: Math.round((correct / questions.length) * 100),
//       questions,
//       answers,
//     };

//     navigate("/work/quiz/result", {
//       state: {
//         result: finalResult,
//       },
//     });
//   };

//   return (
//     <div className="quiz-game-page">
//       <div className="quiz-game-card">
//         <div className="quiz-game-header">
//           <button className="quiz-back-button" onClick={handleExit}>
//             ← Back
//           </button>

//           <span>{config.domain}</span>
//         </div>

//         <h2>Trivia Challenge</h2>

//         <div className="quiz-progress-track">
//           <div
//             className="quiz-progress-fill"
//             style={{
//               width: `${((currentIndex + 1) / questions.length) * 100}%`,
//             }}
//           />
//         </div>

//         <p className="quiz-question-number">
//           Question {currentIndex + 1} of {questions.length}
//         </p>

//         <h3 className="quiz-question">{currentQuestion.question}</h3>

//         <div className="quiz-answer-grid">
//           {currentQuestion.options.map((option) => (
//             <button
//               key={option}
//               className={`quiz-answer-option ${
//                 selectedAnswer === option ? "selected" : ""
//               }`}
//               onClick={() => selectAnswer(option)}
//             >
//               {option}
//             </button>
//           ))}
//         </div>

//         <div className="quiz-game-navigation">
//           <button
//             className="quiz-nav-button"
//             disabled={currentIndex === 0}
//             onClick={() => setCurrentIndex((index) => index - 1)}
//           >
//             ← Previous
//           </button>

//           {currentIndex < questions.length - 1 ? (
//             <button
//               className="quiz-nav-button primary"
//               onClick={() => setCurrentIndex((index) => index + 1)}
//             >
//               Next →
//             </button>
//           ) : (
//             <button
//               className="quiz-nav-button submit"
//               onClick={() => setShowSubmit(true)}
//             >
//               Submit Quiz
//             </button>
//           )}
//         </div>

//         {showSubmit && (
//           <div className="quiz-confirm-overlay">
//             <div className="quiz-confirm-card">
//               <h3>Submit your quiz?</h3>

//               <p>
//                 You answered {Object.keys(answers).length} out of{" "}
//                 {questions.length} questions.
//               </p>

//               <button className="quiz-start-button" onClick={handleSubmit}>
//                 Confirm Submission
//               </button>

//               <button
//                 className="quiz-back-button"
//                 onClick={() => setShowSubmit(false)}
//               >
//                 Continue Quiz
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default QuizGame;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Quiz.css";

const API_URL = "https://proton-pulse.vercel.app/api/quiz";
// const API_URL = "http://localhost:8080/api/quiz";

function QuizGame() {
  const navigate = useNavigate();
  const location = useLocation();

  const config = location.state;

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);

  const [startTime] = useState(Date.now());

  // Fetch questions from backend
  useEffect(() => {
    if (!config?.domain || !config?.questionCount) {
      navigate("/work/quiz/setup", { replace: true });
      return;
    }

    const token =
      localStorage.getItem("token") || localStorage.getItem("jwtToken");

    if (!token) {
      navigate("/signup-login/login?redirect=/work/quiz/setup");
      return;
    }

    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `${API_URL}/questions?domain=${encodeURIComponent(
            config.domain,
          )}&count=${config.questionCount}`,
          {
            headers: {
              Authorization: token,
            },
          },
        );

        const data = await response.json();

        // if (!response.ok) {
        //   throw new Error(data.message || "Unable to fetch questions.");
        // }
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("jwtToken");

          navigate("/signup-login/login?redirect=/work/quiz/setup");
          return;
        }

        if (!response.ok) {
          throw new Error(data.message || "Unable to fetch questions.");
        }

        setQuestions(data.questions || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [config?.domain, config?.questionCount, navigate]);

  const handleAnswer = (optionIndex) => {
    setAnswers((previous) => ({
      ...previous,
      [currentIndex]: optionIndex,
    }));
  };

  const handleSubmit = async () => {
    const token =
      localStorage.getItem("token") || localStorage.getItem("jwtToken");

    if (!token) {
      navigate("/signup-login/login?redirect=/work/quiz");
      return;
    }

    const submissionAnswers = questions.map((question, index) => ({
      questionId: question._id,
      selectedOption: answers[index] ?? null,
    }));

    const submission = {
      domain: config.domain,
      answers: submissionAnswers,
      timeTaken: Math.floor((Date.now() - startTime) / 1000),
    };

    try {
      setSubmitting(true);
      setError("");

      const response = await fetch(`${API_URL}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          domain: submission.domain,
          answers: submission.answers,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to submit quiz.");
      }

      navigate("/work/quiz/result", {
        state: {
          result: data.result,
          submission,
        },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
      setShowSubmit(false);
    }
  };

  const handleExit = () => {
    // navigate("/work/quiz");
    navigate("/work/quiz/setup");

  };

  if (loading) {
    return <div className="quiz-game-page">Loading questions...</div>;
  }

  if (error && questions.length === 0) {
    return (
      <div className="quiz-game-page">
        <div className="quiz-game-card">
          <p>{error}</p>
          <button
            className="quiz-back-button"
            onClick={() => navigate("/work/quiz/setup")}
          >
            Back to Setup
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="quiz-game-page">
        <div className="quiz-game-card">
          <p>No questions are available for this domain.</p>
          <button
            className="quiz-back-button"
            onClick={() => navigate("/work/quiz/setup")}
          >
            Back to Setup
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentIndex];

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <div className="quiz-game-page">
      <div className="quiz-game-card">
        <div className="quiz-game-header">
          <span>{config.domain}</span>
          <button className="quiz-back-button" onClick={handleExit}>
            Exit Quiz
          </button>
        </div>

        <h2>Quiz Challenge</h2>

        <div className="quiz-progress-track">
          <div
            className="quiz-progress-fill"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        <p className="quiz-question-number">
          Question {currentIndex + 1} of {questions.length}
        </p>

        <h3 className="quiz-question">{currentQuestion.question}</h3>

        <div className="quiz-answer-grid">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`quiz-answer-option ${
                selectedAnswer === index ? "selected" : ""
              }`}
              onClick={() => handleAnswer(index)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="quiz-game-navigation">
          <button
            className="quiz-nav-button"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((previous) => previous - 1)}
          >
            ← Previous
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              className="quiz-nav-button primary"
              onClick={() => setCurrentIndex((previous) => previous + 1)}
            >
              Next →
            </button>
          ) : (
            <button
              className="quiz-nav-button submit"
              onClick={() => setShowSubmit(true)}
            >
              Submit Quiz
            </button>
          )}
        </div>

        {error && <p className="quiz-error">{error}</p>}

        {showSubmit && (
          <div className="quiz-confirm-overlay">
            <div className="quiz-confirm-card">
              <h3>Submit Quiz?</h3>
              <p>
                You have answered {answeredCount} out of {questions.length}
                questions.
              </p>
              <p>Unanswered questions: {unansweredCount}</p>

              <button
                className="quiz-nav-button submit"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Confirm Submit"}
              </button>

              <button
                className="quiz-secondary-button"
                onClick={() => setShowSubmit(false)}
                disabled={submitting}
              >
                Continue Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizGame;
