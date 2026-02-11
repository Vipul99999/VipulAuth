import { useContext } from "react";
import { AppContent } from "../context/AppContext";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, userData, loading } = useContext(AppContent);
  const location = useLocation();

  // Show professional loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  // Not logged in → redirect to login and preserve intended route
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in but not verified
  if (!userData?.isAccountVerified) {
    return <Navigate to="/email-verify" replace />;
  }

  return children;
};

export default ProtectedRoute;
