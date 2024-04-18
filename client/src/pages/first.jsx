import React from "react";
import "../styles/first.css"

function First(){
    return (
        <div className="firstMain">
        <div className="firstLabel">
            <h2>StudyEasy</h2>
            <p>A Easy Online Learning Platfrom</p>
        </div>
        <div className="firstContainer"> 
            <div className="firstSplit firstLeft">
            <p>For Admin Login</p>
            <button className="firstBtn">
                <a href="adminLogin" target="_blank" className="firstAa">
                LOGIN
                </a>
            </button>
            <h2>Not Admin? Contact with administrators</h2>
            </div>
            <div className="firstSeparator"></div>
            <div className="firstSplit firstRight">
            <p>For Users Login</p>
            <button className="firstRbtn">
                <a href="studentLogin" target="_blank" className="firstAa">
                LOGIN
                </a>
            </button>
            <h2>
                Don't have an account?
                <a href="studentSignUp" className="firstSign" target="_blank">
                Signup
                </a>
                now!
            </h2>
            </div>
        </div>
        </div>
    );
};
        
       
export default First;