// import "./App.css";
// // import React from "react";
// import Navbar from "./Navbar.js";
// import About from "./About.js";
// import Work from "./Work.js";
// import Blog from "./Blog.js";
// import Home from "./Home.js";
// import Dashboard from "./Dashboard.js";
// import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import { StrictMode } from "react";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import Signup from "./login-me/Signup.js";
// import Login from "./login-me/Login.js";
// import LoginHome from "./login-me/UserHome.js";
// import QuizLanding from "./modules/quiz/QuizLanding";
// import QuizSetup from "./modules/quiz/QuizSetup";
// import QuizGame from "./modules/quiz/QuizGame";
// import QuizResult from "./modules/quiz/QuizResult";
// import QuizHistory from "./modules/quiz/QuizHistory";

// function App() {
//   const CLIENT_ID =
//     "385139104836-cjp1qogmpjs3opefou73lg3jdvis868n.apps.googleusercontent.com";
//   // const location = useLocation();
//   // Hide the navbar only while the quiz is in progress.
//   const hideNavbar = location.pathname === "/work/quiz/play";

//   return (
//     <div className="App">
//       <BrowserRouter>
//         {/* Navigating elements placed here stay visible on every single page */}
//         <Navbar />
//         <Routes>
//           {/* If you have a Home component, use it here. Otherwise, leave it empty or map to a lander */}
//           {/* <Route path="/" element={<DummyHome />}></Route> */}
//           {/* <Route path="/home" element={<Navigate to="/" replace />} /> */}
//           <Route path="/" element={<Home />}></Route>
//           <Route path="/home" element={<Home />}></Route>
//           <Route path="/about" element={<About />}></Route>
//           <Route
//             path="/work"
//             element={
//               <StrictMode>
//                 <GoogleOAuthProvider clientId={CLIENT_ID}>
//                   <Work />
//                 </GoogleOAuthProvider>
//               </StrictMode>
//             }
//           ></Route>
//           {/* Quiz routes */}
//           <Route path="/work/quiz" element={<QuizLanding />} />
//           <Route path="/work/quiz/setup" element={<QuizSetup />} />
//           <Route path="/work/quiz/play" element={<QuizGame />} />
//           <Route path="/work/quiz/result" element={<QuizResult />} />
//           <Route path="/work/quiz/history" element={<QuizHistory />} />

//           <Route path="/blog" element={<Blog />}></Route>
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/signup-login" element={<Signup />} />
//           <Route path="/signup-login/login" element={<Login />} />
//           <Route path="/signup-login/home" element={<LoginHome />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }
// // Hide navbar only during an active quiz.
// function NavbarControl() {
//   const location = useLocation();

//   if (location.pathname === "/work/quiz/play") {
//     return null;
//   }
//   return <Navbar />;
// }
// function QuizRedirect() {
//   return <Navigate to="/work/quiz" replace />;
// }

// export default App;

import "./App.css";

import Navbar from "./Navbar.js";
import About from "./About.js";
import Work from "./Work.js";
import Blog from "./Blog.js";
import Home from "./Home.js";
import Dashboard from "./Dashboard.js";

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { StrictMode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Signup from "./login-me/Signup.js";
import Login from "./login-me/Login.js";
import LoginHome from "./login-me/UserHome.js";

import QuizLanding from "./modules/quiz/QuizLanding";
import QuizSetup from "./modules/quiz/QuizSetup";
import QuizGame from "./modules/quiz/QuizGame";
import QuizResult from "./modules/quiz/QuizResult";
import QuizHistory from "./modules/quiz/QuizHistory";

function App() {
  const CLIENT_ID =
    "385139104836-cjp1qogmpjs3opefou73lg3jdvis868n.apps.googleusercontent.com";

  return (
    <div className="App">
      <BrowserRouter>
        <NavbarControl />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route
            path="/work"
            element={
              <StrictMode>
                <GoogleOAuthProvider clientId={CLIENT_ID}>
                  <Work />
                </GoogleOAuthProvider>
              </StrictMode>
            }
          />

          {/* Quiz routes */}
          <Route path="/work/quiz" element={<QuizLanding />} />
          <Route path="/work/quiz/setup" element={<QuizSetup />} />
          <Route path="/work/quiz/play" element={<QuizGame />} />
          <Route path="/work/quiz/result" element={<QuizResult />} />
          <Route path="/work/quiz/history" element={<QuizHistory />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup-login" element={<Signup />} />
          <Route path="/signup-login/login" element={<Login />} />
          <Route path="/signup-login/home" element={<LoginHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Hide navbar only during an active quiz.
function NavbarControl() {
  const location = useLocation();

  if (location.pathname === "/work/quiz/play") {
    return null;
  }

  return <Navbar />;
}

// Redirect invalid quiz navigation to landing page.
// function QuizRedirect() {
//   return <Navigate to="/work/quiz" replace />;
// }

export default App;
