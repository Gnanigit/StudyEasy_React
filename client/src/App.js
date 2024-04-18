import React from "react";
import {createBrowserRouter,RouterProvider} from 'react-router-dom'

// // auth middleware

// import { AuthorizeUser ,ProtectRoute} from "./middleware/auth";


// import all components
import Home from "./pages/home";
import First from "./pages/first";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";

// root routes
const router = createBrowserRouter([
   {
    path:'/home',
    element:<Home></Home>
   },
   {
    path:'',
    element:<First></First>
   },
   {
    path:'/login',
    element:<Login></Login>
   },
   {
    path:'/signup',
    element:<Signup></Signup>
   },
   {
    path:'/dashboard',
    element:<Dashboard loc=""></Dashboard>
   },
   {
    path:'/addcourse',
    element:<Dashboard loc="addcourse"></Dashboard>
   },
   {
    path:'/mycourses',
    element:<Dashboard loc="mycourses"></Dashboard>
   },
   {
    path:'/allcourses',
    element:<Dashboard loc="allcourses"></Dashboard>
   }

])



export default function App(){
    return(
        <main>
            <RouterProvider router={router}></RouterProvider>
        </main>
    )
}