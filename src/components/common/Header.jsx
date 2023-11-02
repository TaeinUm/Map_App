import React, { useState } from "react";
import "../../styles/App.css";
import { Link, NavLink } from "react-router-dom";

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
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/map"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Map
          </NavLink>
          <NavLink
            to="/community"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Community
          </NavLink>
          <NavLink
            to="/termsconditions"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Terms and Conditions
          </NavLink>
          <NavLink
            to="/privacypolicy"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Privacy Policy
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Contact
          </NavLink>
          <div className="auth-buttons">
            <NavLink
              to="/signin"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Sign In
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      )}
      <nav className="navbar d-flex justify-content-between">
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          HOME
        </NavLink>
        <NavLink
          to="/map"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          MAP
        </NavLink>
        <NavLink
          to="/community"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          COMMUNITY
        </NavLink>
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
