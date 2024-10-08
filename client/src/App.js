import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import all components
import First from "./pages/first";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import Asignup from "./pages/Asignup.jsx";
import Recovery from "./pages/recovery.jsx";
import Reset from "./pages/reset.jsx";
// Root routes
import ChatBot from "./components/chatbot.jsx";
import { AuthorizeUser, ProtectRoute } from "./middleware/auth";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<First />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Asignup" element={<Asignup />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/reset" element={<Reset />} />
        <Route
          path="/dashboard"
          element={
            <ProtectRoute>
              <Dashboard loc="" />
            </ProtectRoute>
          }
        />
        <Route
          path="/addcourse"
          element={
            <ProtectRoute>
              <Dashboard loc="addcourse" />
            </ProtectRoute>
          }
        />
        <Route
          path="/mycourses"
          element={
            <ProtectRoute>
              <Dashboard loc="mycourses" />
            </ProtectRoute>
          }
        />
        <Route
          path="/allcourses"
          element={
            <ProtectRoute>
              <Dashboard loc="allcourses" />
            </ProtectRoute>
          }
        />
        <Route
          path="/addtopic"
          element={
            <ProtectRoute>
              <Dashboard loc="addtopic" />
            </ProtectRoute>
          }
        />
        <Route
          path="/myuploads"
          element={
            <ProtectRoute>
              <Dashboard loc="myuploads" />
            </ProtectRoute>
          }
        />
        <Route
          path="/viewcourse"
          element={
            <ProtectRoute>
              <Dashboard loc="viewcourse" />
            </ProtectRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectRoute>
              <Dashboard loc="about" />
            </ProtectRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectRoute>
              <Dashboard loc="profile" />
            </ProtectRoute>
          }
        />
        <Route
          path="/changepassword"
          element={
            <ProtectRoute>
              <Dashboard loc="changepassword" />
            </ProtectRoute>
          }
        />
      </Routes>
      <ChatBot />
    </Router>
  );
}
