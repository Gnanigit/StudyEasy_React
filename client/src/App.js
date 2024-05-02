import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import all components
import Home from "./pages/home";
import First from "./pages/first";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import Asignup from "./pages/Asignup.jsx";
// Root routes
import { AuthorizeUser ,ProtectRoute} from "./middleware/auth";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<First />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Asignup" element={<Asignup />} />
        <Route path="/dashboard" element={<ProtectRoute><Dashboard loc="" /></ProtectRoute>} />
        <Route path="/addcourse" element={<Dashboard loc="addcourse" />} />
        <Route path="/mycourses" element={<Dashboard loc="mycourses" />} />
        <Route path="/allcourses" element={<Dashboard loc="allcourses" />} />
        <Route path="/addtopic" element={<Dashboard loc="addtopic" />} />
        <Route path="/myuploads" element={<Dashboard loc="myuploads" />} />
        <Route path="/viewcourse" element={<Dashboard loc="viewcourse" />} />
      </Routes>
    </Router>
  );
}
