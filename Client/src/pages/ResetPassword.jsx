import React, { useContext, useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContent);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  // Step states
  const [step, setStep] = useState(1); // 1 = email, 2 = otp, 3 = new password

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  const inputRefs = useRef([]);

  // OTP countdown timer
  useEffect(() => {
    let timer;
    if (otpTimer > 0) {
      timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
    } else if (otpTimer === 0 && otpSent) {
      toast.error("OTP expired! Please request again.");
      setOtpSent(false);
      setStep(1); // go back to email step
    }
    return () => clearTimeout(timer);
  }, [otpTimer, otpSent]);

  // OTP input handlers
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, 6);
    paste.split("").forEach((char, index) => {
      if (inputRefs.current[index]) inputRefs.current[index].value = char;
    });
  };

  // Submit Email
  const onSubmitEmail = async (e) => {
    e.preventDefault();
    if (otpSent) {
      toast.info("OTP already sent. Please wait.");
      return;
    }

    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        { email }
      );
      if (data.success) {
        toast.success(data.message);
        setStep(2);
        setOtpSent(true);
        setOtpTimer(600); // OTP valid for 2 minutes
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Submit OTP
  const onSubmitOtp = (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((input) => input.value);
    setOtp(otpArray.join(""));
    setStep(3);
  };

  // Submit New Password
  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        {
          email,
          otp,
          newPassword,
        }
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/"); // redirect to home
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Helper function to format time
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
   <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-800 to-purple-900">
  <img
    src={assets.authLogo}
    alt=""
    onClick={() => navigate("/")}
    className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
  />

  {/* Step 1: Email */}
  {step === 1 && (
    <form
      onSubmit={onSubmitEmail}
      className="bg-[#2c2f3a] p-8 rounded-lg shadow-lg w-96 text-gray-100 text-sm"
    >
      <h1 className="text-center text-2xl font-semibold mb-4">Reset Password</h1>
      <p className="text-center mb-6 text-gray-400">Enter your registered email address</p>

      <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#3f4458]">
        <img src={assets.mail_icon} alt="email" className="w-4 h-4" />
        <input
          type="email"
          placeholder="Email id"
          className="bg-transparent outline-none text-gray-100 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className={`w-full py-2.5 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 text-white font-medium mt-3 ${
          otpSent ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={otpSent}
      >
        {otpSent ? `Resend OTP in ${formatTime(otpTimer)}` : "Send OTP"}
      </button>
    </form>
  )}

  {/* Step 2: OTP */}
  {step === 2 && (
    <form
      onSubmit={onSubmitOtp}
      className="bg-[#2c2f3a] p-8 rounded-lg shadow-lg w-96 text-gray-100 text-sm"
      onPaste={handlePaste}
    >
      <h1 className="text-center text-2xl font-semibold mb-4">Enter OTP</h1>
      <p className="text-center mb-6 text-gray-400">Enter the 6-digit code sent to your email.</p>

      <div className="flex justify-between mb-4">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              required
              className="w-12 h-12 bg-[#353945] text-gray-100 text-center text-xl rounded-md"
              ref={(el) => (inputRefs.current[index] = el)}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handKeyDown(e, index)}
            />
          ))}
      </div>

      <p className="text-sm text-center text-gray-400 mb-4">
        OTP expires in: {formatTime(otpTimer)}
      </p>

      <button
        type="submit"
        className="w-full py-2.5 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-full"
      >
        Submit OTP
      </button>
    </form>
  )}

  {/* Step 3: New Password */}
  {step === 3 && (
    <form
      onSubmit={onSubmitNewPassword}
      className="bg-[#2c2f3a] p-8 rounded-lg shadow-lg w-96 text-gray-100 text-sm"
    >
      <h1 className="text-center text-2xl font-semibold mb-4">New Password</h1>
      <p className="text-center mb-6 text-gray-400">Enter your new password</p>

      <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#3a3f50]">
        <img src={assets.lock_icon} alt="lock" className="w-4 h-4" />
        <input
          type="password"
          placeholder="Password"
          className="bg-transparent outline-none text-gray-100 w-full"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-2.5 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-full mt-3"
      >
        Reset Password
      </button>
    </form>
  )}
</div>

  );
};

export default ResetPassword;
