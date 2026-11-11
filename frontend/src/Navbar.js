import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
// import Footer from "./Footer.js";

function Navbar() {
  return (
    <div>
      <div className="nav">
        <div className="left">Proton</div>
        <button
          className="navbaTogglerButton"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <FontAwesomeIcon icon={faBars} className="navbarTogglerIcon" />
        </button>
        <div className="navRight collapses navbarCollapse" id="navbarNav">
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
          <button type="" className="nav-button">
            +91 9554040507
            <span>
              <FontAwesomeIcon icon={faPhone} className="callPhone" />
            </span>
          </button>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Navbar;
