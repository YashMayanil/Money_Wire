import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {

  try {

    const token = req.headers.authorization;

    // No token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No Token Provided",
      });
    }

    // Extract token
    const actualToken = token.split(" ")[1];

    // Verify JWT
    const verifiedToken = jwt.verify(
      actualToken,
      process.env.JWT_SECRET_KEY
    );

    // Find user
    const user = await User.findById(
      verifiedToken.id
    ).select("-password");

    // User not found
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // Attach user to request
    req.user = user;

    // Continue
    next();

  } catch (error) {

    console.log(
      "Error in protectRoute",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};