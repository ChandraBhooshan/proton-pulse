// // import React from "react";
// // import { useNavigate } from "react-router-dom";
// // import "./Quiz.css";

// // function QuizLanding() {
// //   const navigate = useNavigate();

// //   const handlePlay = () => {
// //     const token = localStorage.getItem("token");

// //     if (token) {
// //       navigate("/quiz/setup");
// //     } else {
// //       navigate("/signup-login/login?redirect=/quiz/setup");
// //     }
// //   };

// //   return (
// //     <div className="quiz-landing">
// //       <div className="quiz-landing-card">
// //         <div className="quiz-brain">🧠</div>

// //         <h1>Quiz App</h1>

// //         <div className="quiz-title-line"></div>

// //         <p>Test your knowledge with exciting challenges!</p>

// //         <button className="quiz-play-button" onClick={handlePlay}>
// //           Play Now!
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // export default QuizLanding;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import QuizSetup from "./QuizSetup";
// import QuizGame from "./QuizGame";
// import QuizResult from "./QuizResult";
// import "./Quiz.css";

// function QuizLanding() {
//   const navigate = useNavigate();

//   const [screen, setScreen] = useState("landing");
//   const [quizConfig, setQuizConfig] = useState(null);
//   const [result, setResult] = useState(null);

//   const handlePlay = () => {
//     const token = localStorage.getItem("token");

//     navigate("/work/quiz/play", {
//       state: {
//         domain,
//         questionCount,
//       },
//     });

//     if (!token) {
//       navigate("/signup-login/login?redirect=/work?openQuiz=1");
//       return;
//     }

//     setScreen("setup");
//   };

//   const handleStartQuiz = (config) => {
//     setQuizConfig(config);
//     setScreen("game");
//   };

//   const handleFinishQuiz = (quizResult) => {
//     setResult(quizResult);
//     setScreen("result");
//   };

//   const handlePlayAgain = () => {
//     setResult(null);
//     setScreen("setup");
//   };

//   if (screen === "setup") {
//     return (
//       <QuizSetup
//         onBack={() => setScreen("landing")}
//         onStart={handleStartQuiz}
//       />
//     );
//   }

//   if (screen === "game") {
//     return (
//       <QuizGame
//         config={quizConfig}
//         onSubmit={handleFinishQuiz}
//         onExit={() => setScreen("setup")}
//       />
//     );
//   }

//   if (screen === "result") {
//     return (
//       <QuizResult
//         result={result}
//         onPlayAgain={handlePlayAgain}
//         onHome={() => setScreen("landing")}
//       />
//     );
//   }

//   return (
//     <div className="quiz-landing">
//       <div className="quiz-landing-card">
//         <div className="quiz-brain">🧠</div>

//         <h1>Quiz App</h1>

//         <div className="quiz-title-line"></div>

//         <p>Test your knowledge with exciting challenges!</p>

//         <button className="quiz-play-button" onClick={handlePlay}>
//           Play Now!
//         </button>
//         <button onClick={() => navigate("/work/quiz/history")}>
//           My Quiz History
//         </button>
//       </div>
//     </div>
//   );
// }

// export default QuizLanding;

import React from "react";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";

function QuizLanding() {
  const navigate = useNavigate();

  const handlePlay = () => {
    const token =
      localStorage.getItem("token") || localStorage.getItem("jwtToken");

    if (!token) {
      navigate("/signup-login/login?redirect=/work/quiz/setup");
      return;
    }

    navigate("/work/quiz/setup");
  };

  const handleHistory = () => {
    const token =
      localStorage.getItem("token") || localStorage.getItem("jwtToken");

    if (!token) {
      navigate("/signup-login/login?redirect=/work/quiz/history");
      return;
    }

    navigate("/work/quiz/history");
  };

  return (
    <div className="quiz-landing">
      <div className="quiz-landing-card">
        <div className="quiz-brain">🧠</div>

        <h1>Quiz App</h1>

        <div className="quiz-title-line"></div>

        <p>Test your knowledge with exciting challenges!</p>

        <button className="quiz-play-button" onClick={handlePlay}>
          Play Now!
        </button>

        <button onClick={handleHistory}>My Quiz History</button>
      </div>
    </div>
  );
}

export default QuizLanding;
