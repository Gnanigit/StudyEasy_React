import React, { useState , useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast ,{ Toaster } from 'react-hot-toast';
import "../styles/coursecard.css"
import { deleteCourse } from '../helper/helper';
import { enrollCourse } from '../helper/helper';
import { useAuthStore } from '../store/store'

function CourseCard({ role, loc, course }) {
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false); 
  const { email } = useAuthStore(state => state.auth)
 
  const handleEnrollCourse = async (courseId) => {
    try {
        const Id = courseId;
        const response = await enrollCourse({ Id, email });
      if(response){
        toast.success("Course Enrolled Successfully");
      }
      else{
        toast.error("Course Already Enrolled!");
      }
       // Course enrolle
    
    } catch (error) {
        console.error("Error enrolling course:", error);
    }
};

  const handleDeleteCourse = async (courseId) => {
    try {
      const Id = courseId;
      console.log(Id)
      const response=await deleteCourse(Id);
      if(response){
        toast.success(response);
        setIsDeleted(true);
      }
      else{
        toast.error("Course Deletion Failed!");
      } 
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("An error occurred while deleting the course.");
    }
  };

  useEffect(() => {
    
    if (isDeleted && loc === "myuploads") {
      navigate("/myuploads", { replace: true }); 
    }
  }, [isDeleted, loc, navigate]);

 
  if (isDeleted) {
    return null;
  }
  return (
    <li className="course-item">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='course-block'>
        <img src={course.courseImg} alt="Course Image" className="course-image" />
        <h2 className="course-title">{course.courseTitle}</h2>
        <p className="course-content">{course.content}</p>
        
        {loc === "allcourses" && (
          <div className="button-container">

            {role === 0 && (
              <button className="enroll-course" onClick={() =>handleEnrollCourse(course._id)}>Enroll Course</button>
            )}
            <Link to={`/viewcourse?courseId=${encodeURIComponent(course._id)}&role=0`}>

              <button className="view-course">View Course</button>
            </Link>
          </div>
          
        )}

        {loc=== "myuploads" && (
          <>
            <div className="button-container">
              <button className="delete-course" onClick={() => handleDeleteCourse(course._id)}>Delete Course</button>

              <Link to={`/viewcourse?courseId=${encodeURIComponent(course._id)}&role=0`}>
                <button className="view-course">View Course</button>
              </Link>
            </div>
            <div className='down-button'>
            {role === 1 && (
                 <Link to={`/addTopic?courseTitle=${encodeURIComponent(course.courseTitle)}&courseId=${encodeURIComponent(course._id)}`}>
                <button className="add-topic">Add Topic</button>
              </Link>
            )}
              <Link to={`/viewcourse?courseId=${encodeURIComponent(course._id)}&role=1`}>
                <button className="update-course course-button">Update Course</button>
              </Link>
            </div>
          </>
        )}

        {loc === "mycourses" && (
          <div className="button-container course-button">
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
