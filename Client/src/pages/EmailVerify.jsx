import  { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContent } from "../context/AppContext";
import api from "../api/axios";

const EmailVerify = () => {
  const { isLoggedIn, userData, getUserData, loading } = useContext(AppContent);
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Redirect verified users only after loading completes
    if(!loading && !isLoggedIn) navigate("/login");
    if (!loading && isLoggedIn && userData?.isAccountVerified) {
      navigate("/");
    }
    // Focus first input
    inputRefs.current[0]?.focus();
  }, [isLoggedIn, userData, loading, navigate]);

  const handleInput = (e, index) => {
    if (!/^\d?$/.test(e.target.value)) e.target.value = "";
    if (e.target.value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").replace(/\D/g, "");
    paste.split("").forEach((char, index) => {
      if (inputRefs.current[index]) inputRefs.current[index].value = char;
    });
    const firstEmpty = inputRefs.current.findIndex((input) => input.value === "");
    if (firstEmpty !== -1) inputRefs.current[firstEmpty].focus();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const otp = inputRefs.current.map((input) => input.value).join("");
    if (otp.length !== 6) {
      toast.error("Please enter all 6 digits of the OTP");
      return;
    }

    try {
      setSubmitting(true);
      const { data } = await api.post(`/api/auth/verify-account`, { otp });
      if (data.success) {
        toast.success(data.message);
        await getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        src={assets.authLogo}
        alt="Logo"
        onClick={() => navigate("/")}
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <form
        onSubmit={onSubmitHandler}
        className="bg-slate-800 p-8 rounded-lg shadow-lg w-96 text-sm"
      >
        <h1 className="text-white text-center text-2xl font-semibold mb-4">
          Email Verify OTP
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter the 6-digit code sent to your email.
        </p>
        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                required
                className="w-12 h-12 bg-[#4e536d] text-white text-center text-xl rounded-md"
                ref={(el) => (inputRefs.current[index] = el)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-800 text-white rounded-full disabled:opacity-50"
        >
          {submitting ? "Verifying..." : "Verify Email"}
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
