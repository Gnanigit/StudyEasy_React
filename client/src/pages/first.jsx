import React from "react";
import "../styles/first.css";
import { Link } from "react-router-dom";

function First() {
  return (
    <div className="firstMain">
      <div className="firstContainer">
        <div className="firstSplit firstLeft">
          <p>For Admins Login</p>
          <button className="firstRbtn">
            <Link to="/login" state={{ role: "1" }} className="firstAa">
              LOGIN
            </Link>
          </button>

          <h2>
            Don't have an account?
            <Link to="/Asignup">Admin Signup</Link> now!
          </h2>
        </div>
        <div className="firstSeparator"></div>
        <div className="firstSplit firstRight">
          <p>For Learners Login</p>
          <button className="firstRbtn">
            <Link to="/login" state={{ role: "0" }} className="firstAa">
              LOGIN
            </Link>
          </button>

          <h2>
            Don't have an account?
            <Link to="/signup">Learner Signup</Link> now!
          </h2>
        </div>
      </div>
    </div>
  );
}

export default First;
