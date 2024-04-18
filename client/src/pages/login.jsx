import React from "react";
import "../styles/login.css"

function Login(){
    return(
        <div className="loginContainer">
        <div className="loginForm loginLogin">
          
            <header>Login</header>
            <form method="POST" action="/loginsubmit">
              <div className="loginField loginInput-field">
                <input type="email" placeholder="Email" name="email" className="loginInput" />
              </div>
              <div className="loginField loginInput-field">
                <input type="password" placeholder="Password" name="password" className="loginPassword" />
                <i className="bx bx-hide eye-icon"></i> 
              </div>
              <div className="loginForm-link">
                <a href="#" className="loginForgot-pass">Forgot password?</a>
              </div>
              <div className="loginField loginButton-field">
                <button>Login</button>
              </div>
            </form>
            <div className="loginForm-link">
              <span>Don't have an account? <a href="studentSignUp" className="loginLink loginSignup-link">Signup</a></span>
            </div>
          </div>
        </div>
    
    )
}
export default Login;