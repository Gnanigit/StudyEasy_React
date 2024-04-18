import React, { useState } from 'react';
import "../styles/addcourse.css"

function AddCourse() {
  const [courseImage, setCourseImage] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); 
    console.log('Course details:', {
      courseImage,
      courseTitle,
      courseDescription,
    });


    setCourseImage('');
    setCourseTitle('');
    setCourseDescription('');
  };

  return (
    <section className="addcourseSectionCourse" aria-label="recent post">
      <div className="addcourseContainer">  
        <div className="addcourseTitleWrapper">  
          <h2 className="addcourseH2 addcourseSectionTitle">  
            Add a <strong className="Strong">Course</strong>
          </h2>
        </div>
        <ul className="addcourseGridList">  
          <form action="#" method="POST" onSubmit={handleSubmit}>
            <input
              type="text"
              value={courseImage}
              onChange={(e) => setCourseImage(e.target.value)}
              name="courseImage"
              placeholder="Course Image URL"
            />
            <input
              type="text"
              name="courseTitle"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              placeholder="Course Title"
            />
            <textarea
              name="content"
              placeholder="Course Description"
              minLength="10"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
            />
            <div className="addcourseCardContent">  
              <input type="submit" value="ADD COURSE" />
            </div>
          </form>
        </ul>
      </div>
    </section>
  );
}

export default AddCourse;
