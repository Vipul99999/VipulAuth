import express from "express";
import { isAuthenticated, logIn, logOut, register, resetPassword, sendResentOtp, sendVerifyOtp, vefifyEmail } from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

   const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', logIn);
authRouter.post('/logout', logOut);
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);
authRouter.post('/verify-account', userAuth, vefifyEmail);
authRouter.get('/is-auth', userAuth, isAuthenticated);
authRouter.post('/send-reset-otp', sendResentOtp);
authRouter.post('/reset-password', resetPassword);

export default authRouter;