import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import Navbar from "./Navbar";

const Dashboard = () => {
  const { userData, loading } = useContext(AppContent);
  const navigate = useNavigate();

  // Redirect only after loading finishes
  useEffect(() => {
    if (!loading && !userData) {
      navigate("/login");
    }
  }, [userData, loading, navigate]);

  if (loading || !userData) return null; // wait until auth check finishes

  return (
    <div className="min-h-screen bg-gray-100">
  <Navbar />

  {/* Add margin-top to push content below the fixed navbar */}
  <div className="flex flex-col items-center justify-center mt-24 px-4">
    <h1 className="text-4xl font-bold mb-4">Welcome to Your Dashboard</h1>
    <p className="text-lg text-gray-700 mb-6">
      Hello, {userData.name}! You now have access to all features.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
      <div className="p-6 bg-white shadow rounded">
        <h2 className="font-semibold text-xl mb-2">Feature 1</h2>
        <p>Details about feature 1.</p>
      </div>
      <div className="p-6 bg-white shadow rounded">
        <h2 className="font-semibold text-xl mb-2">Feature 2</h2>
        <p>Details about feature 2.</p>
      </div>
      <div className="p-6 bg-white shadow rounded">
        <h2 className="font-semibold text-xl mb-2">Feature 3</h2>
        <p>Details about feature 3.</p>
      </div>
      <div className="p-6 bg-white shadow rounded">
        <h2 className="font-semibold text-xl mb-2">Feature 4</h2>
        <p>Details about feature 4.</p>
      </div>
    </div>
  </div>
</div>

  );
};

export default Dashboard;
