import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import "../styles/coursecard.css";
import useFetch from '../hooks/fetch.hook';
import { deleteCourse, enrollCourse, updateLikeStatus , getLikeStatus} from '../helper/helper';
// import { useAuthStore } from '../store/store';

function CourseCard({ role, loc, course }) {
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false); 
  const [likes, setLikes] = useState(course.likes);
  const [isLiked, setIsLiked] = useState(false); // State to manage like status
  const [{ isLoading, apiData, serverError }] = useFetch()
  const email=apiData?.email;
  useEffect(() => {
    if (loc==="mycourses" && email) {
      const fetchLikeStatus = async () => {
        try {
          const response = await getLikeStatus({ courseId: course._id,email: email });
          if (response.success) {
            setIsLiked(response.isLiked);
          } else {
            toast.error(response.message);
          }
        } catch (error) {
          console.error('Error fetching like status:', error);
          toast.error('An error occurred while fetching the like status.');
        }
      };
      
      fetchLikeStatus();
    }
  }, [course._id, email]);
  

const handleEnrollCourse = async (courseId) => {

  try {
    const Id = courseId;
    const response = await enrollCourse({ Id, email });
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  } catch (error) {
    toast.error("An error occurred while enrolling in the course.");
  }
};

  
  const handleDeleteCourse = async (courseId) => {
    try {
      const Id = courseId;
      const response = await deleteCourse(Id);
      if (response) {
        toast.success(response);
        setIsDeleted(true);
      } else {
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

  const handleLikeClick = async () => {
    try {
      const newLikeStatus = !isLiked;
      const likeStatus = newLikeStatus ? 1 : 0;
      const response = await updateLikeStatus({ courseId: course._id, email, likeStatus });
      if (response.success) {
        setLikes(response.likes);
        setIsLiked(newLikeStatus);
        if(newLikeStatus)
          toast.success('Liked the course!') ;
      } else {
        toast.error('Failed to update like status.');
      }
    } catch (error) {
      console.error('Error updating like status:', error);
      toast.error('An error occurred while updating the like status.');
    }
  };

  if (isDeleted) {
    return null;
  }

  return (
    <li className="course-item">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='course-block'>
        <img src={course.courseImg} alt="Course Image" className="course-image" />
        <div className="course-title-likes">
        <h2 className="course-title">{course.courseTitle}</h2>
        <p><strong>Likes :</strong> {likes}</p>
        </div>
        <p className="course-content">{course.content}</p>
        
        {loc === "allcourses" && (
          <div className="button-container">
            {role === 0 && (
              <button className="enroll-course" onClick={() => handleEnrollCourse(course._id)}>Enroll Course</button>
            )}
            <Link to={`/viewcourse?courseId=${encodeURIComponent(course._id)}&role=0`}>
              <button className="view-course">View Course</button>
            </Link>
          </div>
        )}

        {loc === "myuploads" && (
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
            <Link to={`/viewcourse?courseId=${encodeURIComponent(course._id)}&role=0`}>
              <button className="view-course course-button" type="submit">View Course</button>
            </Link>
            <button 
              className={`like-course ${isLiked ? 'liked' : ''}`} 
              onClick={handleLikeClick}
            >
              {isLiked ? '❤️' : '🤍'}
            </button>
          </div>
        )}
      </div>
    </li>
  );
}

export default CourseCard;
