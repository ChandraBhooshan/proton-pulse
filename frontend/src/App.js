// import logo from './logo.svg';
import "./App.css";
import Navbar from "./Navbar.js";
import About from "./About.js";
import Work from "./Work.js";
import Blog from "./Blog.js";
import Home from "./Home.js";
import Dashboard from "./Dashboard.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Signup from "./login-me/Signup.js";
import Login from "./login-me/Login.js";
import Login_Home from "./login-me/Home.js";

function App() {
  const CLIENT_ID =
    "385139104836-cjp1qogmpjs3opefou73lg3jdvis868n.apps.googleusercontent.com";

  return (
    <div className="App">
      <BrowserRouter>
        {/* Navigating elements placed here stay visible on every single page */}
        <Navbar />
        <Routes>
          {/* If you have a Home component, use it here. Otherwise, leave it empty or map to a lander */}
          {/* <Route path="/" element={<DummyHome />}></Route> */}
          {/* <Route path="/home" element={<Navigate to="/" replace />} /> */}
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route
            path="/work"
            element={
              <StrictMode>
                <GoogleOAuthProvider clientId={CLIENT_ID}>
                  <Work />
                </GoogleOAuthProvider>
              </StrictMode>
            }
          ></Route>
          <Route path="/blog" element={<Blog />}></Route>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup-login" element={<Signup />} />
          <Route path="/signup-login/login" element={<Login />} />
          <Route path="/signup-login/home" element={<Login_Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
