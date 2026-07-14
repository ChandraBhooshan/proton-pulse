import "./About.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function About() {
  return (
    <div>
      {/* This is dummy home page. */}
      <section class="home-section">
        <div class="home" id="home">
          <div class="left">
            <h1>
              Hi.. I'm <br />
              <span
                class="typed"
                data-typed-items="Chandra Bhooshan, Web Developer"
              >
                Chandra Bhooshan
              </span>
            </h1>
            <p>
              {" "}
              I am a motivated and versatile Web Developer, with passion for
              delivering high-quality results. I am dedicated to learning. With
              a positive attitude I am ready to make a meaningful contribution
              and achieve great things.
            </p>
            <a
              href="./CV.pdf"
              class="home-button1"
              download="CV [Chandra Bhooshan]"
            >
              <button type="" class="homeButtons">
                Download CV
              </button>
            </a>
            <a href="mailto:TEST----------@gmail.com" class="home-button2">
              <button type="" class="homeButtons">
                Get in Touch
                <span>
                  <FontAwesomeIcon icon={faArrowRight} class="arrowRight" />
                </span>
              </button>
            </a>
          </div>
          <div class="right">
            <img src="./images/about1.png" alt="" />
          </div>
        </div>
        <img id="home-border" src="./images/border6.png" alt="" />
      </section>
    </div>
  );
}

export default About;
