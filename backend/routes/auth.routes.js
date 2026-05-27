import express from "express";
import { sendOTP, verifyOTPAndRegister } from "../controller/opt.controller.js";
import { Login } from "../controller/auth.controller.js";
const router = express.Router();

router.post("/send-otp", sendOTP);
router.post("/register", verifyOTPAndRegister);
router.post("/login", Login);

export default router;