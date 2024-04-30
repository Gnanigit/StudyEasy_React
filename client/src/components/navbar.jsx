import React  from 'react';
import { Link } from 'react-router-dom';
import "../styles/navbar.css"
import useFetch from '../hooks/fetch.hook';
import img1 from "../assets/logo.avif"
// import { useAuthStore } from '../store/store';

function Navbar() {

  // const { email } = useAuthStore(state => state.auth)
  const [{ isLoading, apiData, serverError }] = useFetch()

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) {
    console.log(serverError+"hello")
    return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  }
  return (
    <div>
      <script src="https://kit.fontawesome.com/9d595d1bf3.js" crossOrigin="anonymous"></script>
    <nav>
      <div className="navbarLogos">
        <Link to="/">
          <img className="navbarLogoImg" src={img1} alt="StudyEasy Logo" />
        </Link>
        <label className="navbarLogo">StudyEasy</label>
      </div>
      <ul className='navbarShow'>
        <li className="navbarLink">
          <Link className="navbarAnc" to="/dashboard">
            Home
          </Link>
        </li>
        <li className="navbarLink">
          <Link className="navbarAnc" to="/allcourses">
            ALL COURSES
          </Link>
        </li>
        {apiData?.role ===0 &&
            <li className="navbarLink">
              <Link className="navbarAnc" to="/mycourse">
                MY COURSES
              </Link>
            </li>
        }

        {apiData?.role === 1 &&
          <li className="navbarLink">
          <Link className="navbarAnc" to="/addcourse">
            ADD COURSE
          </Link>
        </li>
        }
        {apiData?.role === 1 &&
          <li className="navbarLink">
          <Link className="navbarAnc" to="/myuploads">
            MY UPLOADS
          </Link>
        </li>
        }
        <li className="navbarLink">
          <a className="navbarAnc" href="/about">
            About
          </a>
        </li>
        <li className="navbarProfile">
          <i className="fa-regular fa-user"></i>
          <p className="navbarProLink">{apiData?.firstName || apiData?.email}</p>
        </li>
      </ul>
    </nav>
    </div>
  );
}

export default Navbar;
