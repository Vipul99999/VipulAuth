import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";
import "dotenv/config";
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from "../config/emailTemplates.js";

export const register = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Request body missing" });
  }
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await user.save();

    // generate the token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000, // it is 1 days time in millisecond
    });

    // sending welcome email
    const mailOptions = {
  from: `"VipulStack Team" <${process.env.SENDER_EMAIL}>`,
  to: email,
  subject: "Welcome to VipulStack 🚀",
  text: `Welcome ${name || "User"}! Your account has been created successfully.`,
  html: `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Welcome to VipulStack 🚀</h2>
      <p>Hi <strong>${name || "User"}</strong>,</p>
      <p>We're excited to have you onboard.</p>
      <p>Your account has been created with:</p>
      <p><strong>Email:</strong> ${email}</p>
      <br/>
      <p>Happy Coding! 💻</p>
      <p><strong>– VipulStack Team</strong></p>
    </div>
  `,
};


    
    // sending the mail

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email send error:", error);
      } else {
        console.log("Email sent successfully:", info.response);
      }
    });

    return res.json({ success: true });
  } catch (error) {
    console.log("error found in registration");
    res.json({ success: false, message: error.message });
  }
};

// logIn
export const logIn = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Request body missing" });
  }
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "email and password are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Password" });
    }

    // generate the token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000, // it is 1 days time in millisecond
    });

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// logOut
export const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// send Verification OTP to the User's Email
export const sendVerifyOtp = async (req, res) => {
  try {
    const userId = req.user?.id; // get userId from req.user

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID missing" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account already verified" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() +  10 * 60 * 1000; // 10 minutes
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account Verification OTP",
      // text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
      html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}", user.email)
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    console.error("Error in sendVerifyOtp:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to send OTP",
        error: error.message,
      });
  }
};

// verify the email
export const vefifyEmail = async (req, res) => {
  const userId = req.user?.id; // get userId from middleware
  const { otp } = req.body;

  if (!userId || !otp) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      // fixed typo: use Date.now()
      return res.json({ success: false, message: "OTP Expired" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;

    await user.save();

    return res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// check if user is authenticated
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
// Send Password Reset OTP
export const sendResentOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset OTP",
      // text: `Your OTP for resetting your password is ${otp}.Use this OTP to proceed with resetting you password. It is valid for 10 minutes.`,
      html : PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
    };
    await transporter.sendMail(mailOptions);
    return res.json({ success: true, message: "Reset OTP sent to your email" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//Reset User Password
export const resetPassword = async(req, res)=>{
  const {email, otp , newPassword} = req.body;
  if(!email || !otp || !newPassword){
    return res.json({success :false, message : "Email, OTP, and new Password are required."});
  }
  try {
    const user = await userModel.findOne({email});
    if(!user){
      return res.json({success : false, message : 'User not found'});
    }
    if(user.resetOtp ==="" || user.resetOtp !== otp){
      return res.json({success : false, message:'Invalid OTP'});
    }
    if(user.resetOtpExpireAt < Date.now()){
      return res.json({success : false, message:'OTP Expired'});
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = '';
    user.resetOtpExpireAt = 0;
    await user.save();
    return res.json({success : true, message :"Password has been reset successfully" });
    
  } catch (error) {
    return res.json({success :false, message : error.message});
  }
}