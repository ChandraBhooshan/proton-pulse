import { useState } from "react";
import "./Newsletter.css";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus("Please enter your email address.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const API_URL = process.env.REACT_APP_API_URL;
      // Connect this endpoint to your backend.
      // const response = await fetch("/api/newsletter/subscribe", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ email: email.trim() }),
      // });
      const response = await fetch(`${API_URL}/api/newsletter/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Subscription failed.");
      }

      setStatus("Successfully subscribed! Thank you.");
      setEmail("");
    } catch (error) {
      setStatus(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="newsletter-container">
    <div className="newsletter-content">
      <span className="newsletter-tag">STAY UPDATED</span>

      <h2>Join Our Newsletter</h2>

      <p>
        Subscribe to receive updates about new projects, technology,
        applications and upcoming features.
      </p>

      <form onSubmit={handleSubscribe}>
        <div className="newsletter-input-group">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </div>
      </form>

      {status && (
        <p className="newsletter-status" role="status">
          {status}
        </p>
      )}

      <small>No spam. Unsubscribe whenever you want.</small>
      {/* </div> */}
    </div>
  );
}

export default Newsletter;
