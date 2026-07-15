import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
// import Footer from "./Footer.js";

function Navbar() {
  return (
    <div>
      <div class="nav">
        <div class="left">Proton</div>
        <button
          class="navbaTogglerButton"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <FontAwesomeIcon icon={faBars} class="navbarTogglerIcon" />
        </button>
        <div class="navRight collapses navbarCollapse" id="navbarNav">
          <Link to="/home" className="nav-link" aria-current="page">
            Home
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          <Link to="/work" className="nav-link">
            Work
          </Link>
          <Link to="/blog" className="nav-link">
            Blog
          </Link>
          <button type="" class="nav-button">
            +91 955----507
            <span>
              <FontAwesomeIcon icon={faPhone} class="callPhone" />
            </span>
          </button>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Navbar;
