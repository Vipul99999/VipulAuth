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
  className="inline-flex items-center justify-center rounded-full 
             bg-indigo-600 text-white 
             px-8 py-3 text-base font-semibold 
             shadow-md hover:bg-indigo-700 
             hover:shadow-lg 
             active:scale-95 
             transition-all duration-200"
>
  Get Started
</button>

  );
};

export default GetStartedButton; // default export
