// import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
// import OtpPage from "./OtpPage.js";
// import OtpInput from "./OtpInput.js";

import "./Work.css";

function Work() {
  const navigate = useNavigate();

  // function handleLogout() {
  //   googleLogout();
  // }
  return (
    <div className="work-page">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
          // 1. Decode the token to get the user's profile data
          const decodedUser = jwtDecode(credentialResponse.credential);
          console.log(decodedUser);

          // 2. Save the user data to localStorage so it persists across pages
          localStorage.setItem("user", JSON.stringify(decodedUser));
          // 3. Navigate to the Home page
          navigate("/Dashboard");
        }}
        onError={() => console.log("Login failed")}
        auto_select={true}
      />
      {/* <OtpPage /> */}
      {/* <OtpInput /> */}
      <button
        style={{
          background: "#97b8ff",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          fontSize: "16px",
          // fontWeight: "600",
          cursor: "pointer",
        }}
        onClick={() => navigate("/signup-login")}
      >
        Signup/Login
      </button>
    </div>
  );
}

export default Work;
