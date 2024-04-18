import React from "react";
import Navbar from "../components/navbar";
import Banner from "../components/banner";
import Content from "../components/content";
import AddCourse from "../components/addcourse";
import Mycourses from "../components/mycourses";
import Allcourses from "../components/allcouorses";
import About from "../components/about";
import AddTopic from "../components/addtopic";

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
            {loc === "mycourses" && (
                <Mycourses></Mycourses>
            )}
            {loc === "allcourses" && (
                <Allcourses></Allcourses>
            )}
            {loc === "about" && (
                <About></About>
            )}
            {loc === "addtopic" && (
                <AddTopic></AddTopic>
            )}
        </div>
    )
}
export default Dashboard;