import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/coursecard.css";
import useFetch from "../hooks/fetch.hook";
import { useLocation } from "react-router-dom";
import {
  deleteCourse,
  enrollCourse,
  updateLikeStatus,
  getLikeStatus,
  unRegisterCourse,
} from "../helper/helper";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastContainerStyle = {
  zIndex: 9999,
};
const toastStyle = {
  background: "#fff",
  color: "#333",
};

function CourseCard({ role, loc, course, onCoursesUpdatedList }) {
  const navigate = useNavigate();

  const [likes, setLikes] = useState(course.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [{ isLoading, apiData, serverError }] = useFetch();
  const email = apiData?.email;

  const location = useLocation();

  useEffect(() => {}, [location]);

  useEffect(() => {
    if (loc === "mycourses" && email) {
      const fetchLikeStatus = async () => {
        try {
          const response = await getLikeStatus({
            courseId: course._id,
            email: email,
          });
          if (response.success) {
            setIsLiked(response.isLiked);
          }
        } catch (error) {
          console.error("Error fetching like status:", error);
          toast.error("Failed to fetch like status", {
            style: toastStyle,
          });
        }
      };

      fetchLikeStatus();
    }
  }, [course._id, email, loc]);

  const handleEnrollCourse = async (courseId) => {
    try {
      const response = await enrollCourse({ Id: courseId, email });
      if (response.success) {
        console.log(response.message);
        toast.success("Successfully enrolled in the course!", {
          style: toastStyle,
        });
      } else {
        console.error(response.message);
        toast.error("Failed to enroll in the course", {
          style: toastStyle,
        });
      }
    } catch (error) {
      console.error("Failed to enroll in course", error);
      toast.error("An error occurred while enrolling in the course", {
        style: toastStyle,
      });
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      const response = await deleteCourse(courseId);
      if (response) {
        console.log(response.msg);
        onCoursesUpdatedList(courseId);
        toast.success("Course deleted successfully", {
          style: toastStyle,
        });
      }
    } catch (error) {
      console.error("Failed to delete course", error);
      toast.error("Failed to delete the course", {
        style: toastStyle,
      });
    }
  };

  const handleUnRegisterCourse = async (courseId) => {
    if (loc === "mycourses" && email) {
      try {
        const response = await unRegisterCourse({ Id: courseId, email });
        if (response.msg) {
          console.log(response.msg);
          toast.success("Successfully unregistered from the course", {
            style: toastStyle,
          });
          onCoursesUpdatedList(courseId);
        }
      } catch (error) {
        console.error("Failed to unregister from course", error);
        toast.error("Failed to unregister from the course", {
          style: toastStyle,
        });
      }
    }
  };

  const handleLikeClick = async () => {
    try {
      const newLikeStatus = !isLiked;
      const response = await updateLikeStatus({
        courseId: course._id,
        email,
        likeStatus: newLikeStatus ? 1 : 0,
      });
      if (response.success) {
        setLikes(response.likes);
        setIsLiked(newLikeStatus);
        if (newLikeStatus) {
          console.log("Liked the course!");
        }
      }
    } catch (error) {
      console.error("Failed to update like status", error);
    }
  };
  return (
    <li className="course-item">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        style={toastContainerStyle}
        toastStyle={toastStyle}
      />
      <div
        className="course-block"
        style={{ height: loc === "mycourses" ? "500px" : "640px" }}
      >
        <div className="course-image-container">
          <img
            src={course.courseImg}
            alt="Course Image"
            className="course-image"
          />
          {loc === "mycourses" && (
            <button
              className={`like-course ${isLiked ? "liked" : ""}`}
              onClick={handleLikeClick}
            >
              {isLiked ? "❤️" : "🤍"}
            </button>
          )}
        </div>

        <div className="course-title-likes">
          <h2 className="course-title">{course.courseTitle}</h2>
          <p>
            <strong>Likes :</strong> {likes}
          </p>
        </div>
        <p className="course-content">{course.content}</p>

        {loc === "allcourses" && (
          <div className="button-container">
            {role === 0 && (
              <button
                className="enroll-course"
                onClick={() => handleEnrollCourse(course._id)}
              >
                Enroll Course
              </button>
            )}
            <Link
              to={`/viewcourse?courseId=${encodeURIComponent(
                course._id
              )}&role=0`}
            >
              <button className="view-course">View Course</button>
            </Link>
          </div>
        )}

        {loc === "myuploads" && (
          <>
            <div className="button-container">
              <button
                className="delete-course"
                onClick={() => handleDeleteCourse(course._id)}
              >
                Delete Course
              </button>
              <Link
                to={`/viewcourse?courseId=${encodeURIComponent(
                  course._id
                )}&role=0`}
              >
                <button className="view-course">View Course</button>
              </Link>
            </div>
            <div className="down-button">
              {role === 1 && (
                <Link
                  to={`/addTopic?courseTitle=${encodeURIComponent(
                    course.courseTitle
                  )}&courseId=${encodeURIComponent(course._id)}`}
                >
                  <button className="add-topic">Add Topic</button>
                </Link>
              )}
              <Link
                to={`/viewcourse?courseId=${encodeURIComponent(
                  course._id
                )}&role=1`}
              >
                <button className="update-course course-button">
                  Update Course
                </button>
              </Link>
            </div>
          </>
        )}

        {loc === "mycourses" && (
          <div className="button-container">
            <Link
              to={`/viewcourse?courseId=${encodeURIComponent(
                course._id
              )}&role=0`}
            >
              <button className="view-course course-button" type="submit">
                View Course
              </button>
            </Link>

            <button
              className="UnRegiter-course course-button"
              onClick={() => handleUnRegisterCourse(course._id)}
            >
              Un-Register
            </button>
          </div>
        )}
      </div>
    </li>
  );
}

export default CourseCard;
