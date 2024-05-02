import React from "react";
import "../styles/login.css"
import { Link, useNavigate } from 'react-router-dom';
import toast ,{ Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { verifyPassword } from "../helper/helper";
import { useAuthStore } from '../store/store';

function Login(){
  const setEmail = useAuthStore(state=>state.setEmail);
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues : {
      email:'',
      password : ''
    },

    onSubmit: async values => {
      try {
        let loginPromise = verifyPassword({ email:values.email, password: values.password });
    
        const response = await loginPromise; 
        
        toast.success("Login Successful!"); 
    
        let { token } = response.data;
        localStorage.setItem('token', token);
        setEmail(values.email);
        console.log(values);
        navigate('/dashboard');
      } catch (error) {
        toast.error("Password Not Match");
      }
    }
    
    
    
  })

    return(
        <div className="loginContainer">
          <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className="loginForm loginLogin">
            <header>Login</header>
            <form onSubmit={formik.handleSubmit}>
              <div className="loginField loginInput-field">
                <input {...formik.getFieldProps('email')} type="email" placeholder="Email" name="email" className="loginInput" />
              </div>
              <div className="loginField loginInput-field">
                <input {...formik.getFieldProps('password')} type="password" placeholder="Password" name="password" className="loginPassword" />
                <i className="bx bx-hide eye-icon"></i> 
              </div>
              <div className="loginForm-link">
                <a href="#" className="loginForgot-pass">Forgot password?</a>
              </div>
              <div className="loginField loginButton-field">
                <button type="submit">Login</button>
              </div>
            </form>
            <div className="loginForm-link">
              <span>Don't have an account? <Link to="/signup" className="loginLink loginSignup-link">Signup</Link></span>
            </div>
          </div>
        </div>
    
    )
}
export default Login;