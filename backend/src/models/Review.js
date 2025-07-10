// backend/models/Review.js

import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movieTitle: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    comment: {
      type: String,
      required: true,
    },
    // You could add a movie ID from an external API (like TMDB) later
    // movieId: { type: String }
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
