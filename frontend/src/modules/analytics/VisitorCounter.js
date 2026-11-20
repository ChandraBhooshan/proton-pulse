import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API_URL from "../../config.js";
import "./VisitorCounter.css";

function VisitorCounter() {
  const [stats, setStats] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/admin")) return;

    let isActive = true;

    const fetchStats = async () => {
      try {
        const response = await fetch(
          `${API_URL.replace(/\/$/, "")}/api/analytics/summary`,
        );

        if (!response.ok) return;

        const result = await response.json();

        if (isActive && result.success) {
          setStats(result.data);
        }
      } catch (error) {
        console.warn("Visitor statistics unavailable.");
      }
    };

    fetchStats();

    const interval = setInterval(fetchStats, 60000);

    return () => {
      isActive = false;
      clearInterval(interval);
    };
  }, [location.pathname]);

  if (location.pathname.startsWith("/admin") || !stats) {
    return null;
  }

  return (
    <div className="visitor-counter">
      <span>
        <strong>{stats.uniqueVisitors.toLocaleString()}</strong>
        <small>Visitors</small>
      </span>

      <span>
        <strong>{stats.totalPageViews.toLocaleString()}</strong>
        <small>Page Views</small>
      </span>
    </div>
  );
}

export default VisitorCounter;
