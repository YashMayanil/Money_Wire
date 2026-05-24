import express from "express";
import { sendOTP, verifyOTPAndRegister } from "../controller/opt.controller.js";
import { login } from "../controller/auth.controller.js";
const router = express.Router();

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTPAndRegister);
router.post("/login", login);

export default router;