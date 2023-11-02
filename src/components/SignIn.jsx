import React from "react";
import "../App.css";

function SignIn() {
  return (
    <div className="signin-container">
      <div className="signin-form">
        <h2>TerraCanvas</h2>
        <input type="text" placeholder="Username or Email" />
        <input type="password" placeholder="Password" />
        <div className="forgot">
          <a href="/">Forgot?</a>
        </div>
        <button type="submit">Sign In</button>
        <p>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
      <div className="signin-image">
        {/* Replace with your actual image */}
        <img src="/path-to-your-image.jpg" alt="Background" />
      </div>
    </div>
  );
}

export default SignIn;
