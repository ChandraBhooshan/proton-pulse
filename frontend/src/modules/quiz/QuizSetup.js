// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "./Quiz.css";

// // const domains = [
// //   "Computer Science",
// //   "Programming",
// //   "General Knowledge",
// //   "Science",
// //   "Mathematics",
// //   "Artificial Intelligence",
// //   "History",
// // ];

// // const questionCounts = [5, 10, 15, 20, 25, 30];

// // function QuizSetup() {
// //   const navigate = useNavigate();

// //   const [domain, setDomain] = useState("Computer Science");
// //   const [questionCount, setQuestionCount] = useState(10);

// //   const handleStart = () => {
// //     navigate("/quiz/play", {
// //       state: {
// //         domain,
// //         questionCount,
// //       },
// //     });
// //   };

// //   return (
// //     <div className="quiz-setup-page">
// //       <div className="quiz-setup-card">
// //         <span className="quiz-setup-label">PERSONALIZE YOUR EXPERIENCE</span>

// //         <h1>Choose Your Challenge</h1>

// //         <p>Select a subject to test your knowledge.</p>

// //         <h3>Select Domain</h3>

// //         <div className="quiz-domain-grid">
// //           {domains.map((item) => (
// //             <button
// //               key={item}
// //               className={`quiz-domain-option ${
// //                 domain === item ? "selected" : ""
// //               }`}
// //               onClick={() => setDomain(item)}
// //             >
// //               {item}
// //             </button>
// //           ))}
// //         </div>

// //         <h3>Number of Questions</h3>

// //         <div className="quiz-count-options">
// //           {questionCounts.map((count) => (
// //             <button
// //               key={count}
// //               className={`quiz-count-option ${
// //                 questionCount === count ? "selected" : ""
// //               }`}
// //               onClick={() => setQuestionCount(count)}
// //             >
// //               {count}
// //             </button>
// //           ))}
// //         </div>

// //         <div className="quiz-selection-summary">
// //           <span>Selected Domain</span>
// //           <strong>{domain}</strong>

// //           <span>Number of Questions</span>
// //           <strong>{questionCount}</strong>
// //         </div>

// //         <button className="quiz-start-button" onClick={handleStart}>
// //           Start Quiz →
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // export default QuizSetup;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Quiz.css";

// const domains = [
//   "Computer Science",
//   "Programming",
//   "General Knowledge",
//   "Science",
//   "Mathematics",
//   "Artificial Intelligence",
//   "History",
// ];

// const questionCounts = [5, 10, 15, 20, 25, 30];

// function QuizSetup({ onBack, onStart }) {
//   const [domain, setDomain] = useState("Computer Science");
//   const [count, setCount] = useState(5);
//   const navigate = useNavigate();
//   const handleStart = () => {
//     navigate("/work/quiz/play", {
//       state: {
//         domain,
//         questionCount,
//       },
//     });

//     onStart({
//       domain,
//       questionCount: count,
//     });
//   };

//   return (
//     <div className="quiz-setup-page">
//       <div className="quiz-setup-card">
//         <button className="quiz-back-button" onClick={onBack}>
//           ← Back
//         </button>

//         <span className="quiz-eyebrow">PERSONALIZE YOUR EXPERIENCE</span>

//         <h1>Choose Your Challenge</h1>

//         <p>Select your preferred subject and question count.</p>

//         <h3>Select Domain</h3>

//         <div className="quiz-domain-grid">
//           {domains.map((item) => (
//             <button
//               key={item}
//               className={`quiz-domain-option ${
//                 domain === item ? "selected" : ""
//               }`}
//               onClick={() => setDomain(item)}
//             >
//               {item}
//             </button>
//           ))}
//         </div>

//         <h3>Number of Questions</h3>

//         <div className="quiz-count-options">
//           {questionCounts.map((number) => (
//             <button
//               key={number}
//               className={`quiz-count-option ${
//                 count === number ? "selected" : ""
//               }`}
//               onClick={() => setCount(number)}
//             >
//               {number}
//             </button>
//           ))}
//         </div>

//         <div className="quiz-selection-summary">
//           <div>
//             <span>Selected Domain</span>
//             <strong>{domain}</strong>
//           </div>

//           <div>
//             <span>Questions</span>
//             <strong>{count}</strong>
//           </div>
//         </div>

//         <button className="quiz-start-button" onClick={handleStart}>
//           Start Quiz →
//         </button>
//       </div>
//     </div>
//   );
// }

// export default QuizSetup;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";

const domains = [
  "Computer Science",
  "Programming",
  "General Knowledge",
  "Science",
  "Mathematics",
  "Artificial Intelligence",
  "History",
];

const questionCounts = [5, 10, 15, 20, 25, 30];

function QuizSetup() {
  const navigate = useNavigate();

  const [domain, setDomain] = useState("Computer Science");
  const [count, setCount] = useState(5);

  const handleStart = () => {
    navigate("/work/quiz/play", {
      state: {
        domain,
        questionCount: count,
      },
    });
  };

  const handleBack = () => {
    // navigate("/work/quiz");
    navigate("/work");
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("loggedInUser");

    // navigate("/signup-login/login", { replace: true });
    navigate("/work", { replace: true });
  };

  return (
    <div className="quiz-setup-page">
      <div className="quiz-setup-card">
        <button className="quiz-back-button" onClick={handleBack}>
          ← Exit
        </button>
        <button className="quiz-logout-button" onClick={handleLogout}>
          Logout
        </button>

        <span className="quiz-eyebrow">PERSONALIZE YOUR EXPERIENCE</span>

        <h1>Choose Your Challenge</h1>

        <p>Select your preferred subject and question count.</p>

        <h3>Select Domain</h3>

        <div className="quiz-domain-grid">
          {domains.map((item) => (
            <button
              key={item}
              className={`quiz-domain-option ${
                domain === item ? "selected" : ""
              }`}
              onClick={() => setDomain(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <h3>Number of Questions</h3>

        <div className="quiz-count-options">
          {questionCounts.map((number) => (
            <button
              key={number}
              className={`quiz-count-option ${
                count === number ? "selected" : ""
              }`}
              onClick={() => setCount(number)}
            >
              {number}
            </button>
          ))}
        </div>

        <div className="quiz-selection-summary">
          <div>
            <span>Selected Domain</span>
            <strong>{domain}</strong>
          </div>

          <div>
            <span>Questions</span>
            <strong>{count}</strong>
          </div>
        </div>

        <button className="quiz-start-button" onClick={handleStart}>
          Start Quiz →
        </button>
      </div>
    </div>
  );
}

export default QuizSetup;
