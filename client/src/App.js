import React from "react";
import {createBrowserRouter,RouterProvider} from 'react-router-dom'

// // auth middleware

// import { AuthorizeUser ,ProtectRoute} from "./middleware/auth";


// import all components



// root routes
const router = createBrowserRouter([
   
])



export default function App(){
    return(
        <main>
            <RouterProvider router={router}></RouterProvider>
        </main>
    )
}