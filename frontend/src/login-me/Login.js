import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "./support-files/utils";
import "./signup-login.css";
import API_URL from "../config.js";


function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  // const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false);

  const redirectTo = new URLSearchParams(location.search).get("redirect");
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // setAlreadyLoggedIn(true);

      // handleSuccess(
      //   "You are already logged in. Redirecting to your dashboard.",
      // );

      navigate(redirectTo || "/signup-login/home", {
        replace: true,
      });
      // const timer = setTimeout(() => {
      //   navigate(redirectTo || "/signup-login/home", {
      //     replace: true,
      //   });
      // }, 2000);

      // return () => clearTimeout(timer);
    }
  }, [navigate, redirectTo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("email and password are required");
    }
    try {
      // const url = `https://deploy-mern-app-1-api.vercel.app/auth/login`;
      // const url = `http://localhost:8080/auth/login`;
      // const url = `https://www.protonpulse.in/login-me/auth/login`;
      // const url = `https://proton-pulse.vercel.app/signup-login/auth/login`; // worked
      // const url = `http://localhost:8080/signup-login/auth/login`;
      const url = `${API_URL}/signup-login/auth/login`;
      // https://proton-pulse.vercel.app/

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          // navigate("/signup-login/home");
          navigate(redirectTo || "/signup-login/home", {
            replace: true,
          });
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };
  // Hide the login form while redirecting an already logged-in user
  // if (alreadyLoggedIn) {
  //   return <ToastContainer />;
  // }

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={loginInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password..."
            value={loginInfo.password}
          />
        </div>
        <button type="submit">Login</button>
        <span>
          Does't have an account ?{/* <Link to="/signup-login">Signup</Link> */}
          <Link
            to={
              redirectTo
                ? `/signup-login?redirect=${encodeURIComponent(redirectTo)}`
                : "/signup-login"
            }
          >
            Signup
          </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
