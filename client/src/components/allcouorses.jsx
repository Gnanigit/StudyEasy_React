import React, { useState, useEffect } from "react";
import useFetch from '../hooks/fetch.hook';
import Coursecard from "./courseCard";
import { allCourses } from "../helper/helper";
import { myUploads } from "../helper/helper";
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
          response = await myUploads({ email: apiData?.email });
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
  }, [apiData, loc]);

  return (
    <section className="course-section">
      {loc === "myuploads" && <h1>My Uploads</h1>}
      {loc === "mycourses" && <h1>My Courses</h1>}
      {loc === "allcourses" && <h1>All Courses</h1>}
      <ul className="course-list">
        {Array.isArray(courses) && courses.length > 0 ? (
          courses.map(course => (
            <Coursecard role={apiData?.role} loc={loc} key={course._id} course={course} />
          ))
        ) : (
        <p className="error-message">
          {loc === "allcourses" && "No courses available"}
          {loc === "mycourses" && "No enrolled courses available"}
          {loc === "myuploads" && "No uploads available"}
        </p>

        )}
      </ul>
    </section>
  );
}

export default Allcourses;
