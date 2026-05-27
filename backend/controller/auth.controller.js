import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

//Login Controller 

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password",
            });
        }

        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const isPasswordValid = await user.comparePassword(password);
        if(!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
        
        res.status(200).json({
        success: true,
        message: "Login successful",
        token,

        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
