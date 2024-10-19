import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import "../styles/signup.css";
import { registerUser } from "../helper/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastContainerStyle = {
  zIndex: 9999,
};
const toastStyle = {
  background: "#fff",
  color: "#333",
};
function Signup() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      re_enter_password: "",
    },
    onSubmit: async (values) => {
      try {
        await registerUser(values, 0);

        toast.success("Registration successful! Redirecting to login...", {
          onClose: () => {
            navigate("/login");
          },
          style: toastStyle,
        });
      } catch (error) {
        console.error("Could not Register.", error);
        toast.error("Registration failed. Please try again.", {
          style: toastStyle,
        });
      }
    },
  });

  return (
    <div className="signupContainer">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        style={toastContainerStyle}
        toastStyle={toastStyle}
      />
      <div className="signupForm signupSignup">
        <header>Student Signup</header>
        <form onSubmit={formik.handleSubmit}>
          <div className="signupField signupInput-field">
            <input
              {...formik.getFieldProps("email")}
              type="email"
              placeholder="Email"
              name="email"
              className="signupInput"
            />
          </div>
          <div className="signupField signupInput-field">
            <input
              {...formik.getFieldProps("first_name")}
              type="text"
              placeholder="First Name"
              name="first_name"
              className="sighnupFirst_name"
            />
          </div>
          <div className="signupField signupInput-field">
            <input
              {...formik.getFieldProps("last_name")}
              type="text"
              placeholder="Last Name"
              name="last_name"
              className="signupLast_name"
            />
          </div>
          <div className="signupField signupInput-field">
            <input
              {...formik.getFieldProps("password")}
              type="password"
              placeholder="Password"
              name="password"
              className="signupPassword"
            />
          </div>
          <div className="signupField signupInput-field">
            <input
              {...formik.getFieldProps("re_enter_password")}
              type="password"
              placeholder="Re Enter Password"
              name="re_enter_password"
              className="signupRe_enter_Password"
            />
          </div>
          <div className="signupField signupButton-field">
            <button type="submit">Signup</button>
          </div>
        </form>
        <div className="signupForm-link">
          <span>
            Already have an account?
            <Link to="/login" className="signupLink signupSignup-link">
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Signup;
