import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import "../styles/signup.css";
import { registerUser } from "../helper/helper";

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
      console.log(values);
      try {
        values = await Object.assign({}, values);

        let registerPromise = registerUser(values, 1);

        registerPromise.then(() => navigate("/login"));
        console.log("Register Successfully!");
      } catch (error) {
        console.error("Could not Register.");
      }
    },
  });

  return (
    <div className="signupContainer">
      <div className="signupForm signupSignup">
        <header>Admin Signup</header>
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
              className="signupFirst_name"
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
            Do have an account?
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
