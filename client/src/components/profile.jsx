import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import useFetch from '../hooks/fetch.hook';
import { updateUser } from '../helper/helper';
import toast, { Toaster } from 'react-hot-toast';
import "../styles/profile.css"

function Profile() {
  const [{ isLoading, apiData, serverError }] = useFetch();
  console.log(apiData);
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || '',
      lastName: apiData?.lastName || '',
      email: apiData?.email || '',
      mobile: apiData?.mobile || '',
      address: apiData?.address || '',
    },
    enableReinitialize: true,
    // ... validation logic (if needed)
    onSubmit: async (values) => {
      values = await Object.assign(values, {
        // profile: file || apiData?.profile || '',
      });
      let updatePromise = updateUser(values);
      toast.promise(updatePromise, {
        loading: "Updating...",
        success: <b>Updated Successfully</b>,
        error: <b>Could not update</b>,
      });
    },
  });

  function userLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }
  if(isLoading){
    return <h1 className='text-2xl fornt-bold'>isLoading</h1>
  }
  if(serverError){
    return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  }
  return (
    <div className="profile-container">
      <Toaster position="top-center" />
      <div className="profile-header">
        <h4 className="profile-title">Profile</h4>
        <span className="profile-description">You can update the details.</span>
      </div>
      <form className="profile-form" onSubmit={formik.handleSubmit}>
        <div className="profile-fields">
          <div className="name-fields">
            <input
              {...formik.getFieldProps('firstName')}
              name="firstName"
              className="profile-input"
              type="text"
              placeholder="First Name"
            />
            <input
              {...formik.getFieldProps('lastName')}
              className="profile-input"
              type="text"
              placeholder="Last Name"
            />
          </div>
          <div className="contact-fields">
            <input
              {...formik.getFieldProps('mobile')}
              className="profile-input"
              type="text"
              placeholder="Mobile No."
            />
            <input
              {...formik.getFieldProps('email')}
              className="profile-input"
              type="text"
              placeholder="Email"
            />
          </div>
          <input
            {...formik.getFieldProps('address')}
            className="profile-input address"
            type="text"
            placeholder="Address"
          />
          <button className="profile-button" type="submit">
            Update
          </button>
        </div>
        <div className="logout-section">
          <span className="logout-text">Come back later?</span>
          <button onClick={userLogout} className="logout-button" to="/">
            Logout
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
