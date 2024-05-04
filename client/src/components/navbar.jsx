import {React,useState} from 'react';
import { NavLink ,useNavigate} from 'react-router-dom';
import "../styles/navbar.css"
import useFetch from '../hooks/fetch.hook';
import img1 from "../assets/logo.avif"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';

function Navbar() {
  const [{ isLoading, apiData, serverError }] = useFetch()
  const navigate =useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  function userLogout(){
    localStorage.removeItem('token');
    navigate('/');
  }
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  if (isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if (serverError) {
    console.log(serverError + "hello")
    return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  }

  return (
    <div>
      <nav>
        <div className="navbarLogos">
          <NavLink to="/" className="navBarTitle">
            <img className="navbarLogoImg" src={img1} alt="StudyEasy Logo" />
            <label className="navbarLogo">StudyEasy</label>
          </NavLink>
        </div>
        <ul className='navbarShow'>
          <li className="navbarLink">
            <NavLink className="navbarAnc" activeclassname="active" to="/dashboard">
              Home
            </NavLink>
          </li>
          <li className="navbarLink">
            <NavLink className="navbarAnc" activeclassname="active" to="/allcourses">
              ALL COURSES
            </NavLink>
          </li>
          {apiData?.role === 0 &&
            <li className="navbarLink">
              <NavLink className="navbarAnc" activeclassname="active" to="/mycourses">
                MY COURSES
              </NavLink>
            </li>
          }
          {apiData?.role === 1 &&
            <li className="navbarLink">
              <NavLink className="navbarAnc" activeclassname="active" to="/addcourse">
                ADD COURSE
              </NavLink>
            </li>
          }
          {apiData?.role === 1 &&
            <li className="navbarLink">
              <NavLink className="navbarAnc" activeclassname="active" to="/myuploads">
                MY UPLOADS
              </NavLink>
            </li>
          }
          <li className="navbarLink">
            <NavLink className="navbarAnc" activeclassname="active" to="/about">
              About
            </NavLink>
          </li>
          <li className="navbarProfile" onMouseEnter={toggleDropdown} onMouseLeave={closeDropdown}>
            <div className="profileInfo">
              <FontAwesomeIcon icon={faUser} className="fa-regular" />
              <p className="navbarProLink">{apiData?.firstName || apiData?.email}</p>
            </div>
            {isDropdownOpen && (
              <ul className="dropdownMenu">
                <li className="dropdownMenuItem">
                  <NavLink to="/profile">Profile</NavLink>
                </li>
                <li className="dropdownMenuItem">
                  <button onClick={userLogout} to="/">Logout</button>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Navbar