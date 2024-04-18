import React from 'react';
import "../styles/content.css"
import img1 from "../assets/codingContest.avif";
import img2 from "../assets/liveClasses.avif";
import img3 from "../assets/projects.avif";

function Content() {
  return (
    <div className="contentContainer">
      <h1>Our Programs</h1>
      <div className="contentHave">
        <div className="contentImages">
          <img src={img1} alt="Coding Contests" />
          <h2>Coding Contests</h2>
        </div>
        <div className="contentSeparator"></div>
        <div className="contentImages">
          <img src={img2} alt="Live Classes" />
          <h2>Live Classes</h2>
        </div>
        <div className="contentSeparator"></div>
        <div className="contentImages">
          <img src={img3} alt="Projects" />
          <h2>Projects</h2>
        </div>
      </div>
    </div>
  );
}

export default Content;
