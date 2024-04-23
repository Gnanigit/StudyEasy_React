import React from 'react';


// CourseCard component to render each course card
function CourseCard({ course }) {
  return (
    <li className="course-item">
      <img src={course.courseImg} alt="Course Image" className="course-image" />
      <h2 className="course-title">{course.courseTitle}</h2>
      <p className="course-content">{course.content}</p>
      {/* Add Topic button */}
      <a href={`/addTopic?courseTitle=${encodeURIComponent(course.courseTitle)}`}>
        <button className="add-topic">Add Topic</button>
      </a>
    </li>
  );
}
export default CourseCard;