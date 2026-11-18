// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // function QuizHistory() {
// //   const navigate = useNavigate();
// //   const [scores, setScores] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     const token =
// //       localStorage.getItem("token") || localStorage.getItem("jwtToken");

// //     if (!token) {
// //       navigate("/signup-login/login?redirect=/work/quiz/history");
// //       return;
// //     }

// //     async function fetchHistory() {
// //       try {
// //         const response = await fetch(
// //           "https://proton-pulse.vercel.app/api/quiz/my-scores",
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           },
// //         );

// //         if (!response.ok) {
// //           throw new Error("Unable to load quiz history.");
// //         }

// //         const data = await response.json();
// //         setScores(data.scores || data);
// //       } catch (err) {
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     fetchHistory();
// //   }, [navigate]);

// //   if (loading) return <p>Loading quiz history...</p>;
// //   if (error) return <p>{error}</p>;

// //   return (
// //     <div className="quiz-history">
// //       <h1>My Quiz History</h1>

// //       {scores.length === 0 ? (
// //         <p>You haven't saved any quiz scores yet.</p>
// //       ) : (
// //         scores.map((score) => (
// //           <div className="quiz-history-card" key={score._id}>
// //             <h3>{score.domain}</h3>
// //             <p>
// //               Score: {score.correctAnswers}/{score.totalQuestions}
// //             </p>
// //             <p>Percentage: {score.percentage}%</p>
// //             <p>Date: {new Date(score.completedAt).toLocaleDateString()}</p>
// //           </div>
// //         ))
// //       )}
// //     </div>
// //   );
// // }

// // export default QuizHistory;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Quiz.css";

// function QuizHistory() {
//   const navigate = useNavigate();
//   const [scores, setScores] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const token =
//       localStorage.getItem("token") || localStorage.getItem("jwtToken");

//     if (!token) {
//       navigate("/signup-login/login?redirect=/work/quiz/history");
//       return;
//     }

//     async function fetchHistory() {
//       try {
//         const response = await fetch(
//           "https://proton-pulse.vercel.app/api/quiz/my-scores",
//           {
//             headers: {
//               // Authorization: `Bearer ${token}`,
//               Authorization: token,
//             },
//           },
//         );

//         if (!response.ok) {
//           throw new Error("Unable to load quiz history.");
//         }

//         const data = await response.json();
//         const history = data.scores || data;

//         if (!Array.isArray(history)) {
//           throw new Error("Invalid quiz history response.");
//         }

//         setScores(history);
//       } catch (err) {
//         setError(err.message || "Something went wrong.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchHistory();
//   }, [navigate]);

//   if (loading) {
//     return <p>Loading quiz history...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div className="quiz-history">
//       <h1>My Quiz History</h1>

//       {scores.length === 0 ? (
//         <p>You haven't saved any quiz scores yet.</p>
//       ) : (
//         scores.map((score) => (
//           <div className="quiz-history-card" key={score._id}>
//             <h3>{score.domain}</h3>

//             <p>
//               Score: {score.correctAnswers}/{score.totalQuestions}
//             </p>

//             <p>Percentage: {score.percentage}%</p>

//             <p>
//               Date:{" "}
//               {score.completedAt
//                 ? new Date(score.completedAt).toLocaleDateString()
//                 : "Date unavailable"}
//             </p>
//           </div>
//         ))
//       )}

//       <button onClick={() => navigate("/work/quiz")}>Back to Quiz</button>
//     </div>
//   );
// }

// export default QuizHistory;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";

const API_URL = "https://proton-pulse.vercel.app/api/quiz";
// const API_URL = "http://localhost:8080/api/quiz";

function QuizHistory() {
  const navigate = useNavigate();
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("loggedInUser");

    navigate("/work", { replace: true });
  };

  useEffect(() => {
    const token =
      localStorage.getItem("token") || localStorage.getItem("jwtToken");

    if (!token) {
      navigate("/signup-login/login?redirect=/work/quiz/history");
      return;
    }

    async function fetchHistory() {
      try {
        const response = await fetch(`${API_URL}/my-scores`, {
          headers: {
            Authorization: token,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load quiz history.");
        }

        setScores(data.scores || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, [navigate]);

  if (loading) return <p>Loading quiz history...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div className="quiz-history">
      <h1>My Quiz History</h1>

      {scores.length === 0 ? (
        <p>You haven't saved any quiz scores yet.</p>
      ) : (
        scores.map((score) => (
          <div className="quiz-history-card" key={score._id}>
            <h3>{score.domain}</h3>

            <p>
              Score: {score.correctAnswers}/{score.totalQuestions}
            </p>

            <p>Percentage: {score.percentage}%</p>

            <p>Date: {new Date(score.completedAt).toLocaleDateString()}</p>

            <p>Time taken: {score.timeTaken} seconds</p>
          </div>
        ))
      )}

      <button
        className="quiz-back-button"
        // onClick={() => navigate("/work/quiz")}
        onClick={() => navigate("/work")}
      >
        Back to Quiz
      </button>
      <button className="quiz-logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default QuizHistory;
