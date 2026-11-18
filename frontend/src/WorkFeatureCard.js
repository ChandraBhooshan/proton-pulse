import React, { useState } from "react";
import "./WorkFeatureCard.css";

function WorkFeatureCard({ title, description, children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="work-feature-card">
      <button
        type="button"
        className="work-feature-header"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
      >
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <span>{expanded ? "−" : "+"}</span>
      </button>

      <div className={`work-feature-content ${expanded ? "expanded" : ""}`}>
        <div className="work-feature-inner">{children}</div>
      </div>
    </section>
  );
}

export default WorkFeatureCard;
