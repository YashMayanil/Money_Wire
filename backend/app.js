import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import watchlistRoutes from "./routes/watchlist.routes.js";

dotenv.config();

const app = express();


// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));


// Routes

// Authentication Routes
app.use("/api/auth", authRoutes);

// Watchlist Routes
app.use("/api/watchlist", watchlistRoutes);




// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "MoneyWire API Running"
  });
});


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});