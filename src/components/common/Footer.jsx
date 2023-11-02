import "../../styles/App.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="ftr d-flex justify-content-between">
      <div type="button" onClick={() => (window.location.href = "/")}>
        TERRACANVAS
      </div>
      <nav>
        <button>
          <Link to="/termsconditions">Terms and Conditions</Link>
        </button>
        <button>
          <Link to="/privacypolicy">Privacy Policy</Link>
        </button>
        <button>
          <Link to="/contact">Contact</Link>
        </button>
      </nav>
    </footer>
  );
}
export default Footer;
