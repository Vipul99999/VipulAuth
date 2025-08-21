import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedIn } =
    useContext(AppContent);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );
      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      if (data.success) {
        setIsLoggedIn(false);
        setUserData(null);
        navigate("/");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ New function to delete account
  const deleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action is irreversible.")) return;
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.delete(`${backendUrl}/api/auth/delete-account`);
      if (data.success) {
        setIsLoggedIn(false);
        setUserData(null);
        toast.success("Account deleted successfully");
        navigate("/");
      } else {
        toast.error(data.message || "Failed to delete account");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full fixed top-0 bg-white shadow-md z-50">
      <div className="w-full max-w-screen-2xl mx-auto px-6 flex justify-between items-center py-4">
        <div className="flex items-center space-x-3">
          <img
            src={assets.authLogo}
            alt="Auth Logo"
            className="w-10 sm:w-12 md:w-14 lg:w-16 object-contain"
          />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold 
                         bg-clip-text text-transparent 
                         bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400
                         drop-shadow-lg">
            VipulAuth
          </h1>
        </div>

        {userData ? (
          <div className="relative">
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white cursor-pointer select-none"
            >
              {userData.name[0].toUpperCase()}
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-gray-100 text-sm rounded-lg shadow-lg min-w-[150px] z-50">
                <ul className="p-2">
                  {!userData.isAccountVerified && (
                    <li
                      onClick={sendVerificationOtp}
                      className="py-2 px-4 hover:bg-gray-200 cursor-pointer rounded"
                    >
                      Verify Email
                    </li>
                  )}
                  <li
                    onClick={logout}
                    className="py-2 px-4 hover:bg-gray-200 cursor-pointer rounded"
                  >
                    Logout
                  </li>
                  {/* ✅ Delete Account option */}
                  <li
                    onClick={deleteAccount}
                    className="py-2 px-4 hover:bg-red-200 cursor-pointer rounded text-red-600"
                  >
                    Delete Account
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-3 px-6 py-2 rounded-full 
                       bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                       text-white font-semibold text-base shadow-md 
                       hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Login
            <img src={assets.arrow_icon} alt="arrow icon" className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};


export default Navbar;
