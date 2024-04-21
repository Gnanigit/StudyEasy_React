import React ,{ useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/navbar.css"
// import useFetch from '../hooks/fetch.hook';
import img1 from "../assets/logo.avif"


function Navbar({ profile }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
    <nav>
      <div className="navbarLogos">
        <Link to="/">
          <img className="navbarLogoImg" src={img1} alt="StudyEasy Logo" />
        </Link>
        <label className="navbarLogo">StudyEasy</label>
      </div>
      <ul className={isChecked ? 'navbarShow' : ''}>
        <li className="navbarLink">
          <Link className="navbarAnc" to="/studentMain">
            Home
          </Link>
        </li>
        <li className="navbarLink">
          <Link className="navbarAnc" to="/studentAllCourses">
            ALL COURSES
          </Link>
        </li>
        <li className="navbarLink">
          <Link className="navbarAnc" to="/myCourse">
            MY COURSES
          </Link>
        </li>
        <li className="navbarLink">
          <Link className="navbarAnc" to="/myCourse">
            ADD COURSE
          </Link>
        </li>
        <li className="navbarLink">
          <a className="navbarAnc" href="#">
            About
          </a>
        </li>
        <li className="navbarProfile">
          <i className="fa-regular fa-user"></i>
          <p className="navbarProLink"></p>
          {/* <p className="navbarProLink">{profile.name}</p> */}
        </li>
      </ul>
    </nav>
    </div>
  );
}

export default Navbar;
