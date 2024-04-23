import React from "react";
import { useState,useEffect } from "react";
import Coursecard from "./courseCard";
import allCourses from "../helper/helper";

function Allcourses(){
    const [courses, setCourses] = useState([]);
    useEffect(() => {
      allCourses()
        .then(response => {
          setCourses(response.data);
        })
        .catch(error => {
          console.error('Error fetching courses:', error);
        });
    }, []); 
  
    return (
      <section className="course-section">
        <h1>All Courses</h1>
        <ul className="course-list">
          {/* Render CourseCard component for each course */}
          {courses.map(course => (
            <Coursecard key={course._id} course={course} />
          ))}
        </ul>
      </section>
    );
}

export default Allcourses