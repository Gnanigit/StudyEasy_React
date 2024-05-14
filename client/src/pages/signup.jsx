import React from "react";
import { Link, useNavigate} from "react-router-dom";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import "../styles/signup.css";
import { registerUser } from "../helper/helper"; // Assuming this is a separate helper function

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
        values = await Object.assign({}, values); 
      
        let registerPromise = registerUser(values, 0); 

        // Loading toast
        toast.promise(registerPromise, {
          loading: "Creating...",
          success: (response) => {
            registerPromise.then(() => navigate("/")); // Navigate to home after success
            return "Register Successfully!";
          },
          error: (error) => {
            return "Could not Register.";
          },
        });
      } catch (error) {
        // Error toast if registration fails
        toast.error("Could not Register.");
      }
    },
  });

  return (
    <div className="signupContainer">
      <Toaster position="top-center" reverseOrder={false} />
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
            <input {...formik.getFieldProps('password')}
              type="password"
              placeholder="Password"
              name="password"
              className="signupPassword"
            />
          </div>
          <div className="signupField signupInput-field">
            <input {...formik.getFieldProps('re_enter_password')}
              type="password"
              placeholder="Re Enter Password"
              name="re_enter_password"
              className="signupRe_enter_Password"
            />
            </div>
          <div className="signupField signupButton-field">
            <button type='submit'>Signup</button>
          </div>
        </form>
        <div className="signupForm-link">
          <span>
            Do have an account?
            <Link to="/login" className="signupLink signupSignup-link" >
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Signup;
