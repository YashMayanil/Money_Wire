import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

const app = express();


// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log("DB Connection Error:", error.message);
  });


// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "MoneyMatters API Running"
  });
});


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});