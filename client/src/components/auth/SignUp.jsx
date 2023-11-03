import React from "react";
import "../../styles/auth.css";

function SignUp() {
  return (
    <div className="sign-container d-flex justify-content-center align-items-center">
      <div className="sign-image">
        <img src="https://picsum.photos/id/43/1280/831.jpg" alt="Background" />
      </div>
      <div className="sign-form d-flex align-items-center justify-content-center flex-column">
        <h2>TerraCanvas</h2>
        <form className="inputform">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-between">
                <label className="input-top">Name</label>
                <div></div>
              </div>
              <input className="nameinput" type="text" placeholder="Name" />
            </div>
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-between">
                <label className="input-top">Username</label>
              </div>
              <input type="text" placeholder="Username" />
            </div>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="d-flex justify-content-between">
              <label className="input-top">Email</label>
              <div></div>
            </div>
            <input type="email" placeholder="Email" />
            <div className="d-flex justify-content-between">
              <label className="input-top">Password</label>
              <div></div>
            </div>
            <input type="password" placeholder="Password" />
          </div>
          <div className="agreement d-flex">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              I agree with Dribbble's Terms of Service, Privacy Policy, and
              default Notification Settings.
            </label>
          </div>
        </form>
        <button type="submit">Create Account</button>
        <p>
          Already have an account? <a href="/signin">Sign In</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
