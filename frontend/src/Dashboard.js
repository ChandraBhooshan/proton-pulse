import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // 1. Check if there is a logged-in user in localStorage
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      // 2. If yes, parse the JSON string back to an object and set state
      setUser(JSON.parse(storedUser));
    } else {
      // 3. If no user is found, redirect them back to the login page
      navigate("/work");
    }
  }, [navigate]);

  const handleLogout = () => {
    googleLogout(); // Clears Google's internal state
    localStorage.removeItem("user"); // Clears your app's state
    navigate("/work"); // Send back to login screen
  };

  // Show a brief loading state while checking localStorage
  if (!user) return <div>Loading profile...</div>;

  return (
    <div
      className="dashboard-page"
      style={{ textAlign: "center", marginTop: "100px" }}
    >
      <h1>Welcome, {user.name}!</h1>

      {/* The decoded JWT usually includes a profile picture URL */}
      <img
        src={user.picture}
        alt="User Profile"
        style={{ borderRadius: "50%", width: "100px", height: "100px" }}
      />

      <p>Email: {user.email}</p>

      <button
        onClick={handleLogout}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
