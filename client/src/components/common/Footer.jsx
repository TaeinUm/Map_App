import "../../styles/App.css";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="ftr d-flex justify-content-between align-items-center">
      <div
        className="ftrlogo"
        type="button"
        onClick={() => (window.location.href = "/")}
      >
        TERRACANVAS
      </div>
      <nav>
        <button>
          <NavLink
            to="/termsconditions"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Terms and Conditions
          </NavLink>
        </button>
        <button>
          <NavLink
            to="/privacypolicy"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Privacy Policy
          </NavLink>
        </button>
        <button>
          <NavLink
            to="/contact"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Contact
          </NavLink>
        </button>
      </nav>
    </footer>
  );
}
export default Footer;
