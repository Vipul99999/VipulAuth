import React, { useContext } from "react";
import { AppContent } from "../context/AppContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, userData, loading } = useContext(AppContent);

  if (loading) return <div>Loading...</div>; // show spinner if needed

  if (!isLoggedIn) return <Navigate to="/login" />;

  if ( !userData?.isAccountVerified) return <Navigate to="/email-verify" />;

  return children;
};

export default ProtectedRoute;
