import React from 'react';
import "../styles/coursecard.css"

function CourseCard({ course }) {
  return (
    <li className="course-item">
      <div className='course-block'>
      <img src={course.courseImg} alt="Course Image" className="course-image" />
      <h2 className="course-title">{course.courseTitle}</h2>
      <p className="course-content">{course.content}</p>
      {/* Add Topic button */}
      <a href={`/addTopic?courseTitle=${encodeURIComponent(course.courseTitle)}`}>
        <button className="add-topic">Add Topic</button>
      </a>
      </div>
    </li>
  );
}
export default CourseCard;