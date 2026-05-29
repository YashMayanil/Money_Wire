import express from "express";
import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} from "../controller/watchlist.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Add stock to watchlist
router.post("/add", protectRoute, addToWatchlist);

// Get user watchlist
router.get("/", protectRoute, getWatchlist);

// Remove stock from watchlist
router.delete("/:id", protectRoute, removeFromWatchlist);

export default router;