import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/coursecard.css"
import { deleteCourse } from '../helper/helper';
function CourseCard({ role, loc, course }) {
  const navigate = useNavigate()
  const handleDeleteCourse = async () => {
    try {
      const title=course.courseTitle
      const response=await deleteCourse(title);
      console.log(response)
      navigate("/myuploads")
    } catch (error) {
      console.error("Error deleting course:", error);

    }
  };
  return (
    <li className="course-item">
      <div className='course-block'>
        <img src={course.courseImg} alt="Course Image" className="course-image" />
        <h2 className="course-title">{course.courseTitle}</h2>
        <p className="course-content">{course.content}</p>
        
          {loc === "allcourses" && (
            <div className="button-container">
              {role === 1 && (
                <Link to={`/addTopic?courseTitle=${encodeURIComponent(course.courseTitle)}`}>
                  <button className="add-topic">Add Topic</button>
                </Link>
              )}
              <Link to={`/viewcourse?courseTitle=${encodeURIComponent(course.courseTitle)}`}>
                <button className="view-course">View Course</button>
              </Link>
            </div>
          )}
          {
            loc=== "myuploads" && (
              <>
              <div className="button-container">
            <button className="delete-course" onClick={handleDeleteCourse}>Delete Course</button>
            <Link to={`/viewcourse?courseTitle=${encodeURIComponent(course.courseTitle)}`}>
            <button className="view-course">View Course</button>
          </Link>
            </div>
            <div className='down-button'>
            <Link to={`/courseDetails?courseTitle=${encodeURIComponent(course.courseTitle)}`}>
            <button className="update-course course-button">Update Course</button>
            </Link>
              </div>
              </>
            )
          }

          {loc === "mycourses" && (
            <div className="button-container course-button">
            <Link to={`/courseDetails?courseTitle=${encodeURIComponent(course.courseTitle)}`}>
            <button className="view-course">Enroll Course</button>
          </Link>
            <Link to={`/viewcourse?courseTitle=${encodeURIComponent(course.courseTitle)}`}>
            <button className="view-course course-button" type="submit">View Course</button>
            </Link>
              </div>
          )}
        </div>
      
    </li>
  );
}

export default CourseCard;
