import express from "express";
import { sendOTP, verifyOTPAndRegister } from "../controller/opt.controller.js";

const router = express.Router();

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTPAndRegister);

export default router;