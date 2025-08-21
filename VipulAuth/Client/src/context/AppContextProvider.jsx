import { useState, useEffect } from "react";
import { AppContent } from "./AppContext";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Ensure cookies are sent with requests
  axios.defaults.withCredentials = true;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Track auth check

  // Fetch current user authentication state
  const getAuthState = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);
    if (data.success) {
      setIsLoggedIn(true);
      await getUserData();
    } else {
      setIsLoggedIn(false);
      setUserData(null);
    }
  } catch (error) {
    if (error.response?.status === 401) {
      // User not logged in
      setIsLoggedIn(false);
      setUserData(null);
    } else {
      toast.error(error.message);
    }
  } finally {
    setLoading(false);
  }
};


  // Fetch user data
  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`);
      if (data.success) {
        setUserData(data.userData);
      } else {
        setUserData(null);
        toast.error(data.message);
      }
    } catch (error) {
      setUserData(null);
      toast.error(error.message);
    }
  };

  // Run auth check once on app load
  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
    getAuthState,
    loading, // Expose loading state for conditional rendering
  };

  return <AppContent.Provider value={value}>{children}</AppContent.Provider>;
};
