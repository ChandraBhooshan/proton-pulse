// import "./About.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

// function About() {
//   return (
//     <div>
//       <section class="home-section">
//         <div class="home" id="home">
//           <div class="left">
//             <h1>
//               Hi.. I'm <br />
//               <span
//                 class="typed"
//                 data-typed-items="Chandra Bhooshan, Web Developer"
//               >
//                 Chandra Bhooshan
//               </span>
//             </h1>
//             <p>
//               {" "}
//               I am a motivated and versatile Web Developer, with passion for
//               delivering high-quality results. I am dedicated to learning. With
//               a positive attitude I am ready to make a meaningful contribution
//               and achieve great things.
//             </p>

//             <a
//               href="./CV.pdf"
//               class="about-button1"
//               download="CV [Chandra Bhooshan]"
//             >
//               <button type="" class="aboutButtons">
//                 Download CV
//               </button>
//             </a>
//             <a href="mailto:TEST----------@gmail.com" class="about-button2">
//               <button type="" class="aboutButtons">
//                 Get in Touch
//                 <span>
//                   <FontAwesomeIcon icon={faArrowRight} class="arrowRight" />
//                 </span>
//               </button>
//             </a>
//           </div>
//           <div class="right">
//             <img src="./images/about1.png" alt="" />
//           </div>
//         </div>
//         <img id="home-border" src="./images/border6.png" alt="" />
//       </section>
//     </div>
//   );
// }

// export default About;

import "./About.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faDownload } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import CVDownload from "./CVDownload";

function About() {
  // const skills = [
  //   "Web Development",
  //   "Frontend Development",
  //   "Backend Development",
  //   "Python Programming",
  //   "Database Management",
  //   "Problem Solving",
  // ];
  const [showCVForm, setShowCVForm] = useState(false);
  return (
    <main className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-container">
          <div className="about-intro">
            {/* <span className="about-eyebrow">ABOUT ME</span> */}

            <h1>
              Hi, I'm <br />
              <span>Chandra Bhooshan</span>
            </h1>

            {/* <h2 className="about-role">
              Web Developer & Technology Enthusiast
            </h2> */}

            <p className="about-description">
              I am a motivated and versatile developer passionate about building
              useful digital solutions. I enjoy exploring new technologies,
              developing modular applications and solving real-world problems
              through programming. I believe in continuous learning, creativity
              and delivering meaningful results through technology.
            </p>

            <div className="about-actions">
              {/* <a
                href="/CV.pdf"
                className="about-btn about-btn-primary"
                download="CV-Chandra-Bhooshan.pdf"
              >
                Download CV
                <FontAwesomeIcon icon={faDownload} />
              </a> */}
              <button
                type="button"
                className="your-existing-download-button-class"
                onClick={() => setShowCVForm(true)}
              >
                Download CV
              </button>

              {showCVForm && (
                <CVDownload onClose={() => setShowCVForm(false)} />
              )}
              <a
                href="mailto:cb321784@gmail.com"
                className="about-btn about-btn-secondary"
              >
                Get in Touch
                <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </div>
          </div>

          {/* Illustration */}
          <div className="about-illustration">
            <div className="about-image-glow"></div>

            <img
              src="/images/about1.png"
              alt="Developer working on a computer"
            />
          </div>
        </div>
        <img id="home-border" src="./images/border6.png" alt="" />
      </section>

      {/* Introduction Highlights */}
      {/* <section className="about-highlights">
        <div className="about-section-heading">
          <span>WHAT I DO</span>
          <h2>Turning Ideas Into Solutions</h2>
          <p>
            Exploring technology and creating practical applications through
            development.
          </p>
        </div>

        <div className="about-highlight-grid">
          <article className="about-highlight-card">
            <div className="about-icon">
              <FontAwesomeIcon icon={faCode} />
            </div>

            <h3>Development</h3>

            <p>
              Building responsive websites and modular applications with clean
              and reusable code.
            </p>
          </article>

          <article className="about-highlight-card">
            <div className="about-icon">
              <FontAwesomeIcon icon={faLaptopCode} />
            </div>

            <h3>Technology</h3>

            <p>
              Exploring modern tools, programming frameworks and emerging
              technologies.
            </p>
          </article>

          <article className="about-highlight-card">
            <div className="about-icon">
              <FontAwesomeIcon icon={faLightbulb} />
            </div>

            <h3>Problem Solving</h3>

            <p>
              Transforming ideas into useful solutions through logical thinking
              and experimentation.
            </p>
          </article>
        </div>
      </section> */}

      {/* Skills Section */}
      {/* <section className="about-skills">
        <div className="about-section-heading">
          <span>MY EXPERTISE</span>
          <h2>Areas of Interest</h2>
        </div>

        <div className="about-skills-list">
          {skills.map((skill, index) => (
            <span className="about-skill" key={index}>
              {skill}
            </span>
          ))}
        </div>
      </section> */}
    </main>
  );
}

export default About;
