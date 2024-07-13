import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import "./style.css";

const NavBar = (props) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isFixed, setFixed] = useState(true);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleScroll = () => {
    const footer = document.querySelector("footer");
    const footerTop = footer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (footerTop <= windowHeight) {
      setFixed(false);
    } else {
      setFixed(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`navBar shadow-md text-2xl z-30 ${
        isFixed ? "fixed" : "relative"
      }`}
      style={{
        backgroundColor: props.color ?? "transparent",
        color: props.textColor ?? "black",
      }}
    >
      <div className={`menu ${isMenuOpen ? "open" : ""} p-4 gap-4`}>
        <div className="logo">
          <Link to="/drepturi">Cunosteti-va drupturile</Link>
        </div>
        <div>
          <Link to="/desprenoi">Despre noi</Link>
        </div>
        <div>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <Link
            to="/aplica"
            className="bg-green-500 text-white py-2 px-7 rounded-xl hover:bg-green-600 font-bold"
          >
            Aplica acum
          </Link>
        </div>
      </div>
      <button
        className={`hamburger ${isMenuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </button>
    </div>
  );
};

NavBar.propTypes = {
  color: PropTypes.string,
  textColor: PropTypes.string,
};

export default NavBar;
