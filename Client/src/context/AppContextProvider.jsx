import { useState, useEffect, useCallback } from "react";
import { AppContent } from "./AppContext";
import api from "../api/axios";

export const AppContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Fetch user data
  const getUserData = useCallback(async () => {
    try {
      const { data } = await api.get("/api/user/data");

      if (data.success) {
        setUserData(data.userData);
      } else {
        setUserData(null);
      }
    } catch  {
      setUserData(null);
    }
  }, []);

  // 🔎 Check authentication state
  const getAuthState = useCallback(async () => {
    try {
      const { data } = await api.get("/api/auth/is-auth");

      if (data.success) {
        setIsLoggedIn(true);
        await getUserData();
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    } catch  {
      setIsLoggedIn(false);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  }, [getUserData]);

  // Run once on app load
  useEffect(() => {
    getAuthState();
  }, [getAuthState]);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
    getAuthState,
    loading,
  };

  return (
    <AppContent.Provider value={value}>
      {children}
    </AppContent.Provider>
  );
};
