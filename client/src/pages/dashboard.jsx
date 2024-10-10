import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Navbar from "../components/navbar";
import Banner from "../components/banner";
import Content from "../components/content";
import AddCourse from "../components/addcourse";
import Profile from "../components/profile";
import Allcourses from "../components/allcourses";
import About from "../components/about";
import AddTopic from "../components/addtopic";
import ViewCourse from "../components/viewcourse";
import ChangePassword from "../components/changepassword";
import "../styles/dashboard.css";

function Dashboard({ loc }) {
  // Breadcrumb mapping
  const getBreadcrumb = () => {
    const breadcrumbMap = {
      "": "Home",
      addcourse: "Add Course",
      allcourses: "All Courses",
      about: "About",
      addtopic: "Add Topic",
      myuploads: "My Uploads",
      viewcourse: "View Course",
      mycourses: "My Courses",
      profile: "Profile",
      changepassword: "Change Password",
    };
    return breadcrumbMap[loc] || "Dashboard";
  };

  // Page transition animation
  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-content">
        <div className="dashboard-breadcrumb">
          <span>Dashboard</span>
          <ChevronRight size={16} />
          <span className="current-page">{getBreadcrumb()}</span>
        </div>

        <motion.div
          className="dashboard-main"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageTransition}
          transition={{ duration: 0.3 }}
        >
          {loc === "" && (
            <div className="dashboard-home">
              <Banner />
              <Content />
            </div>
          )}
          {loc === "addcourse" && <AddCourse />}
          {loc === "allcourses" && <Allcourses loc="allcourses" />}
          {loc === "about" && <About />}
          {loc === "addtopic" && <AddTopic />}
          {loc === "myuploads" && <Allcourses loc="myuploads" />}
          {loc === "viewcourse" && <ViewCourse />}
          {loc === "mycourses" && <Allcourses loc="mycourses" />}
          {loc === "profile" && <Profile />}
          {loc === "changepassword" && <ChangePassword />}
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
