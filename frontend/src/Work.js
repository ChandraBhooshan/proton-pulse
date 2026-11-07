// // import { GoogleLogin, googleLogout } from "@react-oauth/google";
// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";
// // import OtpPage from "./OtpPage.js";
// // import OtpInput from "./OtpInput.js";

// import "./Work.css";

// function Work() {
//   const navigate = useNavigate();

//   // function handleLogout() {
//   //   googleLogout();
//   // }
//   return (
//     <div className="work-page">
//       <GoogleLogin
//         onSuccess={(credentialResponse) => {
//           console.log(credentialResponse);
//           // 1. Decode the token to get the user's profile data
//           const decodedUser = jwtDecode(credentialResponse.credential);
//           console.log(decodedUser);

//           // 2. Save the user data to localStorage so it persists across pages
//           localStorage.setItem("user", JSON.stringify(decodedUser));
//           // 3. Navigate to the Home page
//           navigate("/Dashboard");
//         }}
//         onError={() => console.log("Login failed")}
//         auto_select={true}
//       />
//       {/* <OtpPage /> */}
//       {/* <OtpInput /> */}
//       <button
//         style={{
//           background: "#97b8ff",
//           color: "white",
//           border: "none",
//           padding: "10px 20px",
//           borderRadius: "8px",
//           fontSize: "16px",
//           // fontWeight: "600",
//           cursor: "pointer",
//         }}
//         onClick={() => navigate("/signup-login")}
//       >
//         Signup/Login
//       </button>
//     </div>
//   );
// }

// export default Work;

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Clock from "./modules/clock/Clock";
import Counter from "./modules/counter/Counter";

import "./Work.css";

function Work() {
  const navigate = useNavigate();

  return (
    <div className="work-page">
      <div className="work-container">
        {/* Page Introduction */}
        {/* <header className="work-heading">
          <h1>My Interactive Workspace</h1>
          <p>
            Explore my collection of independently developed applications and
            components.
          </p>
        </header> */}

        {/* Feature Collection */}
        <div className="work-feature-grid">
          {/* Google Login Module */}
          <section className="work-feature-card">
            <h2>Google Authentication</h2>
            <p>Sign in using your Google account.</p>

            <div className="work-module-content">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);

                  const decodedUser = jwtDecode(credentialResponse.credential);

                  console.log(decodedUser);

                  localStorage.setItem("user", JSON.stringify(decodedUser));

                  navigate("/dashboard");
                }}
                onError={() => console.log("Login failed")}
                auto_select={true}
              />
            </div>
          </section>

          {/* Signup / Login Module */}
          <section className="work-feature-card">
            <h2>Account Authentication</h2>
            <p>Create an account or access an existing account.</p>

            <div className="work-module-content">
              <button
                className="work-action-button"
                onClick={() => navigate("/signup-login")}
              >
                Signup / Login
              </button>
            </div>
          </section>
          {/* Digital Clock Module */}
          <section className="work-feature-card">
            <h2>Digital Clock</h2>
            <p>Real-time local clock.</p>
            <Clock />
          </section>

          <section className="work-feature-card">
            <h2>Counter Application</h2>
            <p>Simple increment and decrement counter.</p>

            <Counter />
          </section>
        </div>
      </div>
    </div>
  );
}

export default Work;
