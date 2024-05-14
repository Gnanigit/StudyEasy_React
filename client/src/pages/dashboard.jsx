import React from "react";
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

function Dashboard({loc}){
    return(
        <div>
            <Navbar></Navbar>
            {loc === "" && ( 
            <>
                <Banner />
                <Content />
            </>
            )}
            {loc === "addcourse" && (
                <AddCourse></AddCourse>
            )}
            {loc === "allcourses" && (
                <Allcourses loc="allcourses"></Allcourses>
            )}
            {loc === "about" && (
                <About></About>
            )}
            {loc === "addtopic" && (
                <AddTopic></AddTopic>
            )}
            {loc === "myuploads" && (
                <Allcourses loc="myuploads"></Allcourses>
            )}
            {loc === "viewcourse" && (
                <ViewCourse></ViewCourse>
            )}
            {loc === "mycourses" && (
                <Allcourses loc="mycourses"></Allcourses>
            )}
            {loc === "profile" && (
                <Profile></Profile>
            )}
            {loc === "changepassword" && (
                <ChangePassword></ChangePassword>
            )}
        </div>
    )
}
export default Dashboard;