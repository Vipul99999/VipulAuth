import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  
  return (
    <>
    
     <ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}//progress bar will hide.
  newestOnTop={true}//Controls whether new toasts appear on top or bottom.
  closeOnClick //Allows users to dismiss a toast by clicking it.
  rtl={false}// or true if using Arabic, Hebrew, etc.
  pauseOnFocusLoss//
  draggable //draggable={true} allows swipe-to-dismiss on touch devices.
  pauseOnHover//pauseOnHover={true} stops autoClose timer when hovering.
  theme="light"
/>

     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
