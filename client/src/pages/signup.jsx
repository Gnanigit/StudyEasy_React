import React from "react";
import "../styles/signup.css";

function Signup() {
  return (
    <div className="signupContainer">
      <div className="signupForm signupSignup">
        <header>Signup</header>
        <form method="POST" action="/loginsubmit">
          <div className="signupField signupInput-field">
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="signupInput"
            />
          </div>
          <div className="signupField signupInput-field">
            <input
              type="text"
              placeholder="First Name"
              name="first_name"
              className="sighnupFirst_name"
            />
          </div>
          <div className="signupField signupInput-field">
            <input
              type="text"
              placeholder="Last Name"
              name="last_name"
              className="signupLast_name"
            />
          </div>
          <div className="signupField signupInput-field">
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="signupPassword"
            />
          </div>
          <div className="signupField signupInput-field">
            <input
              type="password"
              placeholder="Re-Enter Password"
              name="password"
              className="signupRe_enter_Password"
            />
            </div>
          <div className="signupField signupButton-field">
            <button>Signup</button>
          </div>
        </form>
        <div className="signupForm-link">
          <span>
            Do have an account?
            <a href="studentSignUp" className="signupLink signupSignup-link">
              Login
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Signup;
