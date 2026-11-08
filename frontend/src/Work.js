import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Clock from "./modules/clock/Clock";
import Counter from "./modules/counter/Counter";
import Todo from "./modules/todo/Todo";
import "./Work.css";
// import Newsletter from "./modules/newsletter/Newsletter";

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
          <section className="work-feature-card">
            <h2>Todo Application</h2>
            <p>Manage your daily tasks efficiently.</p>

            <Todo />
          </section>

          {/* <section className="work-feature-card">
            <Newsletter />
          </section> */}
        </div>
      </div>
    </div>
  );
}

export default Work;
