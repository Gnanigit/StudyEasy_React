import React from "react";
import "../styles/changepassword.css"
import { changePassword } from "../helper/helper";
import { Link, useNavigate } from 'react-router-dom';
import toast ,{ Toaster } from 'react-hot-toast';
import useFetch from '../hooks/fetch.hook';
import { useFormik } from 'formik';

function ChangePassword() {
    const [{ isLoading, apiData, serverError }] = useFetch()
    const navigate = useNavigate()
    const email=apiData?.email;
    const formik = useFormik({
        initialValues : {
          email:email,
          oldPassword : '',
          newPassword :'',
        },
        onSubmit: async values => {
            console.log("hello")
            try {
                const response= await changePassword({email:email,oldPassword:values.oldPassword,newPassword:values.newPassword})
                toast.success("Password Changed Successfully!"); 
                formik.resetForm();
                navigate("/profile")
            }
            catch(err){
                toast.error("Password Not Changed");
            }
        }
    })

  return (
    <div className="change-password-container">
         <Toaster position='top-center' reverseOrder={false}></Toaster>
      <h2>Change your password</h2>
      <form className="change-password-form" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="oldPassword">Old Password:</label>
          <input {...formik.getFieldProps('oldPassword')} className="changePasswordInput" type="password" id="oldPassword" name="oldPassword" />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password:</label>
          <input {...formik.getFieldProps('newPassword')} className="changePasswordInput" type="password" id="newPassword" name="newPassword" />
        </div>
        <button type="submit" className="change-password-button">Submit</button>
      </form>
    </div>
  );
}

export default ChangePassword;
