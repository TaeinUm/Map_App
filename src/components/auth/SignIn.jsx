import React from "react";
import "../../styles/auth.css";

function SignIn() {
  return (
    <div className="sign-container d-flex justify-content-center align-items-center">
      <div className="sign-form d-flex align-items-center justify-content-center flex-column">
        <h2>TerraCanvas</h2>
        <div className="inputform">
          <div className="d-flex justify-content-between">
            <label className="input-top">Email</label>
            <div></div>
          </div>
          <input type="text" placeholder="Email" />
        </div>
        <div className="inputform">
          <div className="d-flex justify-content-between">
            <label className="input-top">Password</label>
            <div></div>
          </div>
          <input type="password" placeholder="Password" />
        </div>
        <button type="submit">Sign In</button>
        <p>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
        <div className="forgot">
          <p>
            Do you forget the password? <a href="/">Forgot?</a>
          </p>
        </div>
      </div>
      <div className="sign-image">
        <img src="https://picsum.photos/id/58/1280/853.jpg" alt="Background" />
      </div>
    </div>
  );
}

export default SignIn;
