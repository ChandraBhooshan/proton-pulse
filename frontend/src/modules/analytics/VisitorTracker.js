import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import API_URL from "../../config.js";

const getOrCreateId = (storage, key) => {
  let id = storage.getItem(key);

  if (!id) {
    id = window.crypto?.randomUUID
      ? window.crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    storage.setItem(key, id);
  }

  return id;
};

function VisitorTracker() {
  const location = useLocation();
  const lastTrackedPath = useRef("");

  useEffect(() => {
    const path = location.pathname + location.search;

    // Prevent duplicate tracking during React StrictMode effect checks.
    if (lastTrackedPath.current === path) return;
    lastTrackedPath.current = path;

    const track = async () => {
      try {
        const visitorId = getOrCreateId(localStorage, "protonpulse_visitor_id");

        const sessionId = getOrCreateId(
          sessionStorage,
          "protonpulse_session_id",
        );

        await fetch(`${API_URL.replace(/\/$/, "")}/api/analytics/track`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            visitorId,
            sessionId,
            path,
          }),
          keepalive: true,
        });
      } catch (error) {
        // Analytics failure should never interrupt website navigation.
        console.warn("Visitor tracking unavailable.");
      }
    };

    track();
  }, [location.pathname, location.search]);

  return null;
}

export default VisitorTracker;
