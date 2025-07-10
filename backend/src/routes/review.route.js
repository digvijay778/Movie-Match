// backend/routes/review.route.js

import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createReview, getAllReviews, getReviewsByUser } from "../controllers/review.controller.js";

const router = express.Router();

// All review routes are protected
router.use(protectRoute);

router.post("/", createReview); // POST /api/reviews - Create a new review
router.get("/", getAllReviews); // GET /api/reviews - Get all reviews for a public feed
router.get("/user/:userId", getReviewsByUser); // GET /api/reviews/user/:userId - Get reviews for a specific user

export default router;
