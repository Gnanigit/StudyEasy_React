import React from 'react';

function Content() {
  return (
    <div className="container">
      <h1>Our Programs</h1>
      <div className="have">
        <div className="images">
          <img src="../images/codingContest.avif" alt="Coding Contests" />
          <h2>Coding Contests</h2>
        </div>
        <div className="separator"></div>
        <div className="images">
          <img src="../images/liveClasses.avif" alt="Live Classes" />
          <h2>Live Classes</h2>
        </div>
        <div className="separator"></div>
        <div className="images">
          <img src="../images/projects.avif" alt="Projects" />
          <h2>Projects</h2>
        </div>
      </div>
    </div>
  );
}

export default Content;
