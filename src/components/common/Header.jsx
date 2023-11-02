import "../styles/App.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="hdr d-flex justify-content-between align-items-center">
      <div
        type="button"
        className="logo"
        onClick={() => (window.location.href = "/")}
      >
        TERRACANVAS
      </div>
      <nav className="navbar d-flex">
        <a href="/">HOME</a>
        <a href="/map">MAP</a>
        <a href="/community">COMMUNITY</a>
      </nav>
      <div className="user-section d-flex algin-items-center">
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
