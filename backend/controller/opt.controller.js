import otpGenerator from "otp-generator";
import OTP from "../models/otp.model.js";
import sendEmail from "../utils/email.services.js";


// Send OTP
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Generate OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // Delete old OTP
    await OTP.deleteMany({ email });

    // Save OTP
    await OTP.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    // Send Email
    await sendEmail(
      email,
      "MoneyMatters OTP Verification",
      `Your OTP is ${otp}`
    );

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Verify OTP and Register
export const verifyOTPAndRegister = async (req, res) => {
  try {
    const { name, email, password, otp } = req.body;

    // Find OTP
    const existingOTP = await OTP.findOne({ email });

    if (!existingOTP) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    }

    // Check expiry
    if (existingOTP.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    // Check OTP
    if (existingOTP.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Existing user check
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // JWT
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Delete OTP
    await OTP.deleteMany({ email });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
