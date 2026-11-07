import React, { useEffect, useState } from "react";
import "./Clock.css";

function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(false);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Format time
  const timeString = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: !is24Hour,
  });

  // Format date
  const dateString = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="clock-widget">
      <div className="clock-header">
        <span className="clock-indicator"></span>
        <span>LOCAL TIME</span>
      </div>

      <div className="clock-time" aria-live="off">
        {timeString}
      </div>

      <div className="clock-date">{dateString}</div>

      <button
        className="clock-format-button"
        onClick={() => setIs24Hour(!is24Hour)}
      >
        Switch to {is24Hour ? "12-hour" : "24-hour"} format
      </button>
    </div>
  );
}

export default Clock;
