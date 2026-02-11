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

  <div className="min-h-screen bg-gray-50 pt-28 px-6">
  <div className="max-w-6xl mx-auto">
    
    {/* Header Section */}
    <div className="mb-10 text-center md:text-left">
      <h1 className="text-4xl font-bold text-gray-900">
        Welcome back, <span className="text-indigo-600">{userData?.name}</span> 👋
      </h1>
      <p className="mt-3 text-gray-600 text-lg">
        Here’s an overview of your dashboard and available features.
      </p>
    </div>

    {/* Stats / Feature Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition duration-300">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Feature One
        </h2>
        <p className="text-gray-600 text-sm">
          Manage your account settings and preferences easily.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition duration-300">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Feature Two
        </h2>
        <p className="text-gray-600 text-sm">
          Track performance metrics and analytics in real-time.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition duration-300">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Feature Three
        </h2>
        <p className="text-gray-600 text-sm">
          Access secure data and manage integrations.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition duration-300">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Feature Four
        </h2>
        <p className="text-gray-600 text-sm">
          Monitor user activity and system updates.
        </p>
      </div>

    </div>
  </div>
</div>

</div>

  );
};

export default Dashboard;
