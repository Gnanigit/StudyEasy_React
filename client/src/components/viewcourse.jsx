import React, { useEffect, useState } from 'react';
import {  useLocation } from 'react-router-dom';
import "../styles/viewcourse.css";

import { viewCourse } from '../helper/helper';
import img1 from "../assets/gfg.png"
import img2 from "../assets/jPoint.png"
import img3 from "../assets/w3Schools.png"
import img4 from "../assets/youtube.png"

function ViewCourse() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const courseTitle = queryParams.get('courseTitle');
    const [courseData, setCourseData] = useState(null);

    useEffect(() => {
      // Fetch course data based on courseTitle
      fetchCourseData(courseTitle);
    }, [courseTitle]);
  
    const fetchCourseData = async (title) => {
      try {
        const response = await viewCourse({title});
        setCourseData(response);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };
  
    if (!courseData) {
      return <div>Loading...</div>;
    }
  
  return (
    <div className="viewCoursecontainer">
      {courseData.length !== 0 ? (
        <>
          <h1 className="viewCourse">{courseData[0].courseTitle}</h1>
          <ul className='courseTopics'>
            {courseData.map(topic => (
              <li key={topic.id} className="topics">
                <h2 className="topic">{topic.topicTitle}</h2>
                <div className="links">
                  <p className="link">
                    <a className="icon-link" target="_blank" rel="noopener noreferrer" href={topic.link1}>
                      <span className="link-icon"><img src={img1} alt="GeeksForGeeks" /></span>
                      GeeksForGeeks
                    </a>
                  </p>
                  <p className="link">
                    <a className="icon-link" target="_blank" rel="noopener noreferrer" href={topic.link2}>
                      <span className="link-icon"><img src={img2} alt="Java Point" /></span>
                      <span>java Point</span>
                    </a>
                  </p>
                  <p className="link">
                    <a className="icon-link" target="_blank" rel="noopener noreferrer" href={topic.link3}>
                      <span className="link-icon"><img src={img3} alt="W3 Schools" /></span>
                      W3 Schools
                    </a>
                  </p>
                  <p className="link">
                    <a className="icon-link" target="_blank" rel="noopener noreferrer" href={topic.link4}>
                      <span className="link-icon"><img src={img4} alt="You Tube" /></span>
                      You Tube
                    </a>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <h1 className='viewCourse'>No Data</h1>
      )}
    </div>
  );
}

export default ViewCourse;