import React, { useEffect } from "react";
import "../styles/addcourse.css";
import { useNavigate } from "react-router-dom";
import { addCourse } from "../helper/helper";
import { useFormik } from "formik";
import useFetch from "../hooks/fetch.hook";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastContainerStyle = {
  zIndex: 9999,
};
const toastStyle = {
  background: "#fff",
  color: "#333",
};
function AddCourse() {
  const navigate = useNavigate();
  const [{ apiData }] = useFetch();

  const formik = useFormik({
    initialValues: {
      courseImage: "",
      courseTitle: "",
      content: "",
    },
    onSubmit: async (values) => {
      try {
        const addCoursePromise = addCourse({
          email: apiData?.email,
          courseImage: values.courseImage,
          courseTitle: values.courseTitle,
          content: values.content,
        });
        console.log(addCoursePromise);
        if (addCoursePromise) {
          formik.resetForm();
          toast.success("Course added successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setTimeout(() => {
            navigate("/addcourse");
          }, 3000);
        } else {
          toast.error("Failed to add course. Please try again.", {
            style: toastStyle,
          });
        }
      } catch (error) {
        console.error("Invalid input", error);
        toast.error("Invalid input. Please check your data and try again.", {
          style: toastStyle,
        });
      }
    },
  });

  return (
    <section className="addcourseSectionCourse" aria-label="recent post">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        style={toastContainerStyle}
        toastStyle={toastStyle}
      />
      <div className="addcourseContainer">
        <div className="addcourseTitleWrapper">
          <h2 className="addcourseH2 addcourseSectionTitle">
            Add a <strong className="Strong">COURSE</strong>
          </h2>
        </div>
        <ul className="addcourseGridList">
          <form onSubmit={formik.handleSubmit}>
            <input
              {...formik.getFieldProps("courseImage")}
              type="text"
              className="addcourseInput"
              name="courseImage"
              placeholder="Course Image URL"
            />
            <input
              {...formik.getFieldProps("courseTitle")}
              type="text"
              className="addcourseInput"
              name="courseTitle"
              placeholder="Course Title"
            />
            <textarea
              {...formik.getFieldProps("content")}
              name="content"
              placeholder="Course Description"
              minLength="10"
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
