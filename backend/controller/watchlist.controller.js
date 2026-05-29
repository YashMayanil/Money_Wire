import Watchlist from "../models/watchlist.model.js";


// =========================
// Add Stock To Watchlist
// =========================

export const addToWatchlist = async (req, res) => {
  try {

    const { symbol, companyName } = req.body;

    // Check fields
    if (!symbol || !companyName) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if already added
    const existingStock = await Watchlist.findOne({
      user: req.user._id,
      symbol,
    });

    if (existingStock) {
      return res.status(400).json({
        success: false,
        message: "Stock already in watchlist",
      });
    }

    // Create watchlist item
    const watchlist = await Watchlist.create({
      user: req.user._id,
      symbol,
      companyName,
    });

    res.status(201).json({
      success: true,
      message: "Stock added to watchlist",
      watchlist,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// =========================
// Get User Watchlist
// =========================

export const getWatchlist = async (req, res) => {
  try {

    const watchlist = await Watchlist.find({
      user: req.user._id,
    });

    res.status(200).json({
      success: true,
      count: watchlist.length,
      watchlist,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// =========================
// Remove Stock
// =========================

export const removeFromWatchlist = async (req, res) => {
  try {

    const { id } = req.params;

    const stock = await Watchlist.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Stock not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Stock removed successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};