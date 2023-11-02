import React from "react";
import "../../styles/auth.css";

function SignUp() {
  return (
    <div className="signup-page">
      <div className="container">
        <h2>TerraCanvas</h2>
        <form>
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Username" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <div>
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              I agree with Dribbble's Terms of Service, Privacy Policy, and
              default Notification Settings.
            </label>
          </div>
          <button type="submit">Create Account</button>
          <p>
            Already have an account? <a href="/signin">Sign In</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
