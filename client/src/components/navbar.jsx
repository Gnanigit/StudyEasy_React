import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import useFetch from "../hooks/fetch.hook";
import img1 from "../assets/logo.avif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHome,
  faBookOpen,
  faFolderOpen,
  faUpload,
  faInfoCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 700) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };

    handleResize(); // Call once to set initial state
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function userLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  return (
    <div>
      <nav>
        <div className="navbarLogos">
          <div className="navBarTitle">
            <img className="navbarLogoImg" src={img1} alt="StudyEasy Logo" />
            <label className="navbarLogo">StudyEasy</label>
          </div>
        </div>
        <div className="checkbtn" onClick={() => setShowMenu(!showMenu)}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <ul className={`navbarShow ${showMenu ? "visible" : ""}`}>
          <li className="navbarLink">
            <NavLink
              className="navbarAnc"
              activeclassname="active"
              to="/dashboard"
            >
              <FontAwesomeIcon icon={faHome} /> Home
            </NavLink>
          </li>
          <li className="navbarLink">
            <NavLink
              className="navbarAnc"
              activeclassname="active"
              to="/allcourses"
            >
              <FontAwesomeIcon icon={faBookOpen} /> ALL COURSES
            </NavLink>
          </li>
          {apiData?.role === 0 && (
            <li className="navbarLink">
              <NavLink
                className="navbarAnc"
                activeclassname="active"
                to="/mycourses"
              >
                <FontAwesomeIcon icon={faFolderOpen} /> MY COURSES
              </NavLink>
            </li>
          )}
          {apiData?.role === 1 && (
            <li className="navbarLink">
              <NavLink
                className="navbarAnc"
                activeclassname="active"
                to="/addcourse"
              >
                <FontAwesomeIcon icon={faUpload} /> ADD COURSE
              </NavLink>
            </li>
          )}
          {apiData?.role === 1 && (
            <li className="navbarLink">
              <NavLink
                className="navbarAnc"
                activeclassname="active"
                to="/myuploads"
              >
                <FontAwesomeIcon icon={faFolderOpen} /> MY UPLOADS
              </NavLink>
            </li>
          )}
          <li className="navbarLink">
            <NavLink className="navbarAnc" activeclassname="active" to="/about">
              <FontAwesomeIcon icon={faInfoCircle} /> About
            </NavLink>
          </li>
          <li
            className="navbarProfile"
            onMouseEnter={toggleDropdown}
            onMouseLeave={closeDropdown}
          >
            <div className="profileInfo">
              <FontAwesomeIcon icon={faUser} />
              <p className="navbarProLink">
                {apiData?.firstName || apiData?.email}
              </p>
            </div>
            {isDropdownOpen && (
              <ul className="dropdownMenu">
                <li className="dropdownMenuItem">
                  <NavLink to="/profile">
                    <FontAwesomeIcon icon={faUser} /> Profile
                  </NavLink>
                </li>
                <li className="dropdownMenuItem">
                  <button onClick={userLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                  </button>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
