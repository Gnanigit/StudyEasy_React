import React from "react";
import { Link } from "react-router-dom";
import "../styles/about.css";
const About = () => {
  return (
    <div>
      <section className="about-us">
        <div className="row">
          <div className="about-col">
            <h1>Study Resource platform</h1>
            <p>
              StudyResource.com offers a vast collection of educational
              materials, from textbooks to video tutorials, making it a one-stop
              destination for students. Our platform provides easy access to
              study aids and resources, enhancing the learning experience.
              Explore our website for comprehensive study materials and academic
              assistance.
            </p>
            <Link to="/dashboard" className="hero-btn red-btn">
              EXPLORE NOW
            </Link>
          </div>
          <div className="about-col">
            <img
              src="https://talibilm.pk/wp-content/uploads/2020/02/9-Most-useful-Courses-in-2020-for-professional-Life.png"
              alt="Study Resources"
            />
          </div>
        </div>
      </section>
      <section className="footer">
        <h4>About Us</h4>
        <p>
          At our study resource website, we are dedicated to empowering learners
          of all backgrounds with access to quality educational materials.{" "}
          <br />
          With a commitment to knowledge dissemination, we strive to be your
          trusted partner on your academic journey.
        </p>
        <div className="icons">
          <i className="fa fa-facebook"></i>
          <i className="fa fa-twitter"></i>
          <i className="fa fa-instagram"></i>
          <i className="fa fa-linkedin"></i>
        </div>
        <p>© 2024 Gnani. All rights reserved.</p>
      </section>
    </div>
  );
};

export default About;
