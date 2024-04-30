import React, { useState, useEffect } from "react";
import useFetch from '../hooks/fetch.hook';
import Coursecard from "./courseCard";
import { allCourses} from "../helper/helper";
import {myUploads} from "../helper/helper";
import { myCourses } from "../helper/helper";
import "../styles/allcourses.css";

function Allcourses({ loc }) {
  const [{ isLoading, apiData, serverError }] = useFetch();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (loc === "allcourses") {
          response = await allCourses();
        } else if (loc === "myuploads") {
          response = await myUploads( {email: apiData?.email} );
        } else if (loc === "mycourses") {
          response = await myCourses({ email: apiData?.email });
        }
        setCourses(response); 
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    if (apiData) {
      fetchData(); 
    }
  }, [apiData, loc]); // Add apiData and loc to dependencies array

  return (
    <section className="course-section">
      <h1>All Courses</h1>
      <ul className="course-list">
  {/* Render CourseCard component for each course */}
  {Array.isArray(courses) ? (
    courses.map(course => (
      <Coursecard role={apiData?.role} loc={loc} key={course._id} course={course} />
    ))
  ) : (
    <p>No courses available</p>
  )}
      </ul>
    </section>
  );
}

export default Allcourses;
