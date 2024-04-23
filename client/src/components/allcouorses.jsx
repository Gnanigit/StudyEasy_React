import React from "react";
import { useState,useEffect } from "react";
import Coursecard from "./courseCard";
import {allCourses} from "../helper/helper";
import "../styles/allcourses.css"

function Allcourses(){
    const [courses, setCourses] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await allCourses(); 
          setCourses(response); 
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      };
  
      fetchData(); 
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