import React, { useState } from "react";
import "./CVDownload.css";

const API_URL = "http://localhost:8080";

function CVDownload({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    purpose: "Job opportunity",
    consent: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.consent) {
      setError("Please provide consent to continue.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/cv/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "CV request failed.");
      }

      // Receive the PDF from the backend
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "CV-Chandra-Bhooshan.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
      onClose();
    } catch (err) {
      setError(err.message || "Unable to download CV.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cv-modal-overlay" onClick={onClose}>
      <div className="cv-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="cv-modal-close"
          onClick={onClose}
          aria-label="Close form"
        >
          ×
        </button>

        <div className="cv-modal-heading">
          <h2>Download My CV</h2>
          {/* <p>Please share a few details before downloading.</p> */}
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="cv-name">Full Name *</label>
          <input
            id="cv-name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            maxLength="100"
            required
          />

          <label htmlFor="cv-email">Email Address *</label>
          <input
            id="cv-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />

          <label htmlFor="cv-organization">Organization (Optional)</label>
          <input
            id="cv-organization"
            name="organization"
            value={form.organization}
            onChange={handleChange}
            placeholder="Company / Institution"
            maxLength="150"
          />

          <label htmlFor="cv-purpose">Purpose *</label>
          <select
            id="cv-purpose"
            name="purpose"
            value={form.purpose}
            onChange={handleChange}
          >
            <option>Job opportunity</option>
            <option>Recruitment</option>
            <option>Professional networking</option>
            <option>Academic reference</option>
            {/* <option>Other</option> */}
          </select>

          {/* <label className="cv-consent">
            <input
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={handleChange}
              required
            />
            <span>
              I agree that these details may be stored and used to manage and
              track my CV download request.
            </span>
          </label> */}

          {error && <p className="cv-error">{error}</p>}

          <button type="submit" className="cv-submit" disabled={loading}>
            {loading ? "Preparing CV..." : "Submit and Download CV"}
          </button>
        </form>

        {/* <p className="cv-privacy">
          Your information will be used for CV download tracking and related
          professional communication.
        </p> */}
      </div>
    </div>
  );
}

export default CVDownload;
