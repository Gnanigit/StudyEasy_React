import React from "react";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { verifyPassword } from "../helper/helper";
import { useAuthStore } from "../store/store";

function Login() {
  const setEmail = useAuthStore((state) => state.setEmail);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      try {
        let loginPromise = verifyPassword({
          email: values.email,
          password: values.password,
        });

        const response = await loginPromise;

        console.log("Login Successful!"); // Log success message

        let { token } = response.data;
        localStorage.setItem("token", token);
        setEmail(values.email);
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } catch (error) {
        console.error("Password Not Match"); // Log error message
      }
    },
  });

  return (
    <div className="loginContainer">
      <div className="loginForm loginLogin">
        <header>Login</header>
        <form onSubmit={formik.handleSubmit}>
          <div className="loginField loginInput-field">
            <input
              {...formik.getFieldProps("email")}
              type="email"
              placeholder="Email"
              name="email"
              className="loginInput"
            />
          </div>
          <div className="loginField loginInput-field">
            <input
              {...formik.getFieldProps("password")}
              type="password"
              placeholder="Password"
              name="password"
              className="loginPassword"
            />
            <i className="bx bx-hide eye-icon"></i>
          </div>
          <div className="loginForm-link">
            <Link to="/recovery" className="loginForgot-pass">
              Forgot password?
            </Link>
          </div>
          <div className="loginField loginButton-field">
            <button type="submit">Login</button>
          </div>
        </form>
        <div className="loginForm-link">
          <span>
            Don't have an account?{" "}
            <Link to="/signup" className="loginLink loginSignup-link">
              Signup
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
