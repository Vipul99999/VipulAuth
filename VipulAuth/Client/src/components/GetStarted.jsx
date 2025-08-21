// GetStarted.jsx
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContent } from "../context/AppContext";

const GetStartedButton = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AppContent);

  const handleClick = () => {
    if (userData) {
      navigate("/dashboard"); // go to dashboard if logged in
    } else {
      navigate("/login"); // go to login if not
    }
  };

  return (
    <button
      onClick={handleClick}
      className="border border-gray-500 rounded-full px-8 py-3 hover:bg-gray-100 transition-all text-base font-medium"
    >
      Get Started
    </button>
  );
};

export default GetStartedButton; // default export
