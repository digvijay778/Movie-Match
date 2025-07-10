// backend/controllers/review.controller.js

import Review from "../models/Review.js";
import User from "../models/User.js";

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private
export const createReview = async (req, res) => {
  const { movieTitle, rating, comment } = req.body;

  if (!movieTitle || !rating || !comment) {
    return res.status(400).json({ error: "Please provide all required fields." });
  }

  try {
    const review = new Review({
      user: req.user._id, // from protectRoute middleware
      movieTitle,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: "Server error while creating review." });
  }
};

// @desc    Get all reviews for a feed
// @route   GET /api/reviews
// @access  Private
export const getAllReviews = async (req, res) => {
  try {
    // Fetch reviews and populate user details (fullName and profilePic)
    const reviews = await Review.find({})
      .populate("user", "fullName profilePic")
      .sort({ createdAt: -1 }); // Show newest first

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Server error while fetching reviews." });
  }
};

// @desc    Get all reviews by a specific user
// @route   GET /api/reviews/user/:userId
// @access  Private
export const getReviewsByUser = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.params.userId })
        .populate("user", "fullName profilePic")
        .sort({ createdAt: -1 });

    if (!reviews) {
        return res.status(404).json({ message: "No reviews found for this user." });
    }

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Server error while fetching user reviews." });
  }
};
