// // import React, { useState } from "react";
// // import "./Quiz.css";

// // function QuizResult({ result, onPlayAgain, onHome }) {
// //   const [saveChoice, setSaveChoice] = useState(null);

// //   const handleSave = () => {
// //     // Backend score-saving API will be connected in the next stage.
// //     setSaveChoice("save");
// //   };

// //   const handleSkip = () => {
// //     setSaveChoice("skip");
// //   };

// //   return (
// //     <div className="quiz-result-page">
// //       <div className="quiz-result-card">
// //         <div className="quiz-result-icon">
// //           {result.percentage >= 60 ? "🏆" : "📝"}
// //         </div>

// //         <span className="quiz-eyebrow">QUIZ COMPLETED</span>

// //         <h1>Your Results</h1>

// //         <div className="quiz-score-circle">
// //           <strong>{result.percentage}%</strong>
// //           <span>Score</span>
// //         </div>

// //         <div className="quiz-result-stats">
// //           <div>
// //             <strong>{result.total}</strong>
// //             <span>Total</span>
// //           </div>

// //           <div>
// //             <strong>{result.correct}</strong>
// //             <span>Correct</span>
// //           </div>

// //           <div>
// //             <strong>{result.incorrect}</strong>
// //             <span>Incorrect</span>
// //           </div>

// //           <div>
// //             <strong>{result.unanswered}</strong>
// //             <span>Unanswered</span>
// //           </div>
// //         </div>

// //         <h3>Would you like to save your score?</h3>

// //         {!saveChoice ? (
// //           <div className="quiz-save-actions">
// //             <button className="quiz-start-button" onClick={handleSave}>
// //               Save My Score
// //             </button>

// //             <button className="quiz-secondary-button" onClick={handleSkip}>
// //               Don't Save
// //             </button>
// //           </div>
// //         ) : (
// //           <p className="quiz-save-message">
// //             {saveChoice === "save"
// //               ? "Score saving will be connected to your account in the backend integration stage."
// //               : "Your score will not be saved to your account."}
// //           </p>
// //         )}

// //         <div className="quiz-result-actions">
// //           <button className="quiz-secondary-button" onClick={onPlayAgain}>
// //             Play Again
// //           </button>

// //           <button className="quiz-back-button" onClick={onHome}>
// //             Quiz Home
// //           </button>
// //         </div>

// //         <div className="quiz-review">
// //           <h3>Answer Review</h3>

// //           {result.questions.map((question, index) => (
// //             <div className="quiz-review-item" key={index}>
// //               <p>
// //                 <strong>
// //                   {index + 1}. {question.question}
// //                 </strong>
// //               </p>

// //               <p>Your answer: {result.answers[index] || "Not answered"}</p>

// //               <p>Correct answer: {question.answer}</p>

// //               <span>
// //                 {result.answers[index] === question.answer
// //                   ? "✓ Correct"
// //                   : "✗ Incorrect"}
// //               </span>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default QuizResult;

// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import "./Quiz.css";

// function QuizResult() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const result = location.state?.result;

//   const [saveChoice, setSaveChoice] = useState(null);
//   const [saving, setSaving] = useState(false);
//   const [saveError, setSaveError] = useState("");

//   if (!result) {
//     return (
//       <div className="quiz-result-page">
//         <div className="quiz-result-card">
//           <h2>Result unavailable</h2>
//           <p>Please complete a quiz first.</p>
//           <button
//             className="quiz-back-button"
//             onClick={() => navigate("/work/quiz")}
//           >
//             Quiz Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const handleSave = async () => {
//     const token =
//       localStorage.getItem("token") || localStorage.getItem("jwtToken");

//     if (!token) {
//       navigate("/signup-login/login?redirect=/work/quiz/history");
//       return;
//     }

//     setSaving(true);
//     setSaveError("");

//     try {
//       // This payload matches the previous backend
//       // saveScore controller's expected structure.
//       const submission = result.submission;

//       if (!submission) {
//         throw new Error(
//           "Quiz submission data is missing. Backend integration is required.",
//         );
//       }

//       const response = await fetch(
//         "https://proton-pulse.vercel.app/api/quiz/save-score",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(submission),
//         },
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Unable to save score.");
//       }

//       setSaveChoice("save");
//     } catch (error) {
//       setSaveError(error.message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleSkip = () => {
//     setSaveChoice("skip");
//   };

//   return (
//     <div className="quiz-result-page">
//       <div className="quiz-result-card">
//         <div className="quiz-result-icon">
//           {result.percentage >= 60 ? "🏆" : "📝"}
//         </div>

//         <span className="quiz-eyebrow">QUIZ COMPLETED</span>

//         <h1>Your Results</h1>

//         <div className="quiz-score-circle">
//           <strong>{result.percentage}%</strong>
//           <span>Score</span>
//         </div>

//         <div className="quiz-result-stats">
//           <div>
//             <strong>{result.total}</strong>
//             <span>Total</span>
//           </div>

//           <div>
//             <strong>{result.correct}</strong>
//             <span>Correct</span>
//           </div>

//           <div>
//             <strong>{result.incorrect}</strong>
//             <span>Incorrect</span>
//           </div>

//           <div>
//             <strong>{result.unanswered}</strong>
//             <span>Unanswered</span>
//           </div>
//         </div>

//         <h3>Would you like to save your score?</h3>

//         {!saveChoice ? (
//           <div className="quiz-save-actions">
//             <button
//               className="quiz-start-button"
//               onClick={handleSave}
//               disabled={saving}
//             >
//               {saving ? "Saving..." : "Save My Score"}
//             </button>

//             <button
//               className="quiz-secondary-button"
//               onClick={handleSkip}
//               disabled={saving}
//             >
//               Don't Save
//             </button>
//           </div>
//         ) : (
//           <p className="quiz-save-message">
//             {saveChoice === "save"
//               ? "Your score has been saved successfully!"
//               : "Your score was not saved."}
//           </p>
//         )}

//         {saveError && <p className="quiz-save-message">{saveError}</p>}

//         <div className="quiz-result-actions">
//           <button
//             className="quiz-secondary-button"
//             onClick={() => navigate("/work/quiz/setup")}
//           >
//             Play Again
//           </button>

//           <button
//             className="quiz-back-button"
//             // onClick={() => navigate("/work/quiz")}
//             onClick={() => navigate("/work")}
//           >
//             Quiz Home
//           </button>
//         </div>

//         <div className="quiz-review">
//           <h3>Answer Review</h3>

//           {result.questions.map((question, index) => (
//             <div className="quiz-review-item" key={index}>
//               <p>
//                 <strong>
//                   {index + 1}. {question.question}
//                 </strong>
//               </p>

//               <p>Your answer: {result.answers[index] || "Not answered"}</p>

//               <p>Correct answer: {question.answer}</p>

//               <span>
//                 {result.answers[index] === question.answer
//                   ? "✓ Correct"
//                   : "✗ Incorrect"}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default QuizResult;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Quiz.css";

const API_URL = "https://proton-pulse.vercel.app/api/quiz";
// const API_URL = "http://localhost:8080/api/quiz";

function QuizResult() {
  const navigate = useNavigate();
  const location = useLocation();

  const result = location.state?.result;
  const submission = location.state?.submission;

  const [saveChoice, setSaveChoice] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Handle missing result data
  if (!result || !submission) {
    return (
      <div className="quiz-result-page">
        <div className="quiz-result-card">
          <h2>Result Unavailable</h2>
          <p>Your quiz result could not be found.</p>
          <button
            className="quiz-start-button"
            onClick={() => navigate("/work/quiz")}
          >
            Back to Quiz Home
          </button>
        </div>
      </div>
    );
  }

  // Save score to MongoDB
  const handleSave = async () => {
    const token =
      localStorage.getItem("token") || localStorage.getItem("jwtToken");

    if (!token) {
      navigate("/signup-login/login?redirect=/work/quiz");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const response = await fetch(`${API_URL}/save-score`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(submission),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to save your score.");
      }

      setSaveChoice("save");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleSkip = () => {
    setSaveChoice("skip");
  };

  return (
    <div className="quiz-result-page">
      <div className="quiz-result-card">
        <div className="quiz-result-icon">
          {result.percentage >= 60 ? "🏆" : "📝"}
        </div>

        <span className="quiz-eyebrow">QUIZ COMPLETED</span>
        <h1>Your Results</h1>

        <div className="quiz-score-circle">
          <strong>{result.percentage}%</strong>
          <span>Score</span>
        </div>

        <div className="quiz-result-stats">
          <div>
            <strong>{result.totalQuestions}</strong>
            <span>Total</span>
          </div>

          <div>
            <strong>{result.correctAnswers}</strong>
            <span>Correct</span>
          </div>

          <div>
            <strong>{result.incorrectAnswers}</strong>
            <span>Incorrect</span>
          </div>

          <div>
            <strong>{result.unanswered}</strong>
            <span>Unanswered</span>
          </div>
        </div>

        <h3>Would you like to save your score?</h3>

        {!saveChoice ? (
          <div className="quiz-save-actions">
            <button
              className="quiz-start-button"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save My Score"}
            </button>

            <button
              className="quiz-secondary-button"
              onClick={handleSkip}
              disabled={saving}
            >
              Don't Save
            </button>
          </div>
        ) : (
          <p className="quiz-save-message">
            {saveChoice === "save"
              ? "Your quiz score has been saved successfully!"
              : "Your score was not saved."}
          </p>
        )}

        {error && <p className="quiz-error">{error}</p>}

        <div className="quiz-result-actions">
          {/* <button
            className="quiz-secondary-button"
            onClick={() => navigate("/work/quiz/setup")}
          >
            Play Again
          </button> */}

          <button
            className="quiz-back-button"
            // onClick={() => navigate("/work/quiz")}
            onClick={() => navigate("/work/quiz/setup")}
          >
            Quiz Home
          </button>
          {/* <button className="quiz-logout-button" onClick={handleLogout}>
            Logout
          </button> */}
        </div>

        <div className="quiz-review">
          <h3>Answer Review</h3>

          {result.review.map((item, index) => (
            <div className="quiz-review-item" key={item.questionId}>
              <p>
                <strong>
                  {index + 1}. {item.question}
                </strong>
              </p>

              <p>
                Your answer:{" "}
                {item.selectedOption === null
                  ? "Not answered"
                  : item.options[item.selectedOption]}
              </p>

              <p>Correct answer: {item.options[item.correctAnswer]}</p>

              <span>
                {item.isCorrect
                  ? "✓ Correct"
                  : item.selectedOption === null
                    ? "Not Attempted"
                    : "✗ Incorrect"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuizResult;
