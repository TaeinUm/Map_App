import React from "react";
import "../../styles/auth.css";

function SignIn() {
  return (
    <div className="signin-container d-flex justify-content-center align-items-center">
      <div className="signin-form d-flex align-items-center justify-content-center flex-column">
        <h2>TerraCanvas</h2>
        <div className="inputform">
          <div className="d-flex justify-content-between">
            <p className="input-top">Email</p>
            <div></div>
          </div>
          <input type="text" placeholder="Email" />
        </div>
        <div className="inputform">
          <div className="d-flex justify-content-between">
            <p className="input-top">Password</p>
            <div className="forgot">
              <a href="/">Forgot?</a>
            </div>
          </div>
          <input type="password" placeholder="Password" />
        </div>
        <button type="submit">Sign In</button>
        <p>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
      <div className="signin-image">
        <img src="/path-to-your-image.jpg" alt="Background" />
      </div>
    </div>
  );
}

export default SignIn;
