import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      {/* <div className="contact-conainer">
        <div className="contact-item">
          <img src="./images/phone-call2.png" alt="Phone" />
          <div>
            <p>+91 9554040507</p>
            <p>Mon-Fri: 9am-6pm</p>
          </div>
        </div>

        <div className="contact-item">
          <img src="./images/email2.png" alt="Email" />
          <div>
            <p>cb321784@gmail.com</p>
          </div>
        </div>

        <div className="contact-item">
          <img src="./images/map2.png" alt="Location" />
          <div>
            <p>Sector 66, Noida</p>
            <p>Uttar Pradesh, IN (213141)</p>
          </div>
        </div>
      </div> */}

      <div className="summary">
        <div id="col1">
          <h5>Chandra Bhooshan</h5>
          <hr />

          <p>
            I am a motivated and versatile Web Developer, with passion for
            delivering high-quality results. I am dedicated to learning. With a
            positive attitude I am ready to make a meaningful contribution and
            achieve great things.
          </p>
        </div>

        <div id="col2">
          <h5>Products</h5>
          <hr />

          <ul>
            <li>
              <a href="https://protonpulse.in">Web Designing</a>
            </li>
            <li>
              <a href="https://protonpulse.in">Java Core, GUI</a>
            </li>
            <li>
              <a href="https://protonpulse.in">Software Development</a>
            </li>
            <li>
              <a href="https://protonpulse.in">Project Management</a>
            </li>
          </ul>
        </div>

        <div id="col3">
          <h5>Useful links</h5>
          <hr />

          <ul>
            <li>
              <a href="https://protonpulse.in">Home</a>
            </li>
            <li>
              <a href="https://protonpulse.in">About</a>
            </li>
            <li>
              <a href="https://protonpulse.in">Careers</a>
            </li>
            <li>
              <a href="https://protonpulse.in">Contact</a>
            </li>

          </ul>
        </div>

        <div id="col4">
          <h5>Contact</h5>
          <hr />

          <ul>
            <li>
              <a href="https://protonpulse.in">
                <i className="fab fa-facebook"></i> Facebook
              </a>
            </li>

            <li>
              <a href="https://protonpulse.in">
                <i className="fab fa-github"></i> Github
              </a>
            </li>

            <li>
              <a href="https://protonpulse.in">
                <i className="fab fa-linkedin"></i> Linkedin
              </a>
            </li>

            <li>
              <a href="https://protonpulse.in">
                <i className="fab fa-instagram"></i> Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div id="copyright">
        {/* &copy; {new Date().getFullYear()} ProtonPulse Inc. All rights reserved. */}
      </div>
    </footer>
  );
}

export default Footer;
