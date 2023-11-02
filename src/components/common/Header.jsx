import React, { useState } from "react";
import "../../styles/App.css";
import { Link } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <header className="hdr d-flex justify-content-between align-items-center">
      <div
        type="button"
        className="logo"
        onClick={() => (window.location.href = "/")}
      >
        TERRACANVAS
      </div>
      <div
        className={`hamburger-menu ${isOpen ? "rotate" : ""}`}
        onClick={() => handleMenuClick()}
      >
        ☰
      </div>
      {isOpen && (
        <div className="mobile-nav active">
          <Link to="/">Home</Link>
          <Link to="/map">Map</Link>
          <Link to="/community">Community</Link>
          <Link to="/termsconditions">Terms and Conditions</Link>
          <Link to="/privacypolicy">Privacy Policy</Link>
          <Link to="/contact">Contact</Link>
          <div className="auth-buttons">
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      )}
      <nav className="navbar d-flex">
        <Link to="/">HOME</Link>
        <Link to="/map">MAP</Link>
        <Link to="/community">COMMUNITY</Link>
      </nav>
      <div className="user-section d-flex align-items-center">
        <button>
          <Link to="/signin">Sign In</Link>
        </button>
        <button>
          <Link to="/signup">Sign Up</Link>
        </button>
      </div>
    </header>
  );
}

export default Header;
