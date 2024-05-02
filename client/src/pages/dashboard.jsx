import React from "react";
import Navbar from "../components/navbar";
import Banner from "../components/banner";
import Content from "../components/content";
import AddCourse from "../components/addcourse";

import Allcourses from "../components/allcouorses";
import About from "../components/about";
import AddTopic from "../components/addtopic";
import ViewCourse from "../components/viewcourse";

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
                <ViewCourse loc="viewcourse"></ViewCourse>
            )}
            {loc === "mycourses" && (
                <Allcourses loc="mycourses"></Allcourses>
            )}
        </div>
    )
}
export default Dashboard;