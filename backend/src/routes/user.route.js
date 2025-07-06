import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  acceptFriendRequest,
  getFriendRequests,
  getMyFriends,
  getOutgoingFriendReqs,
  getRecommendedUsers,
  sendFriendRequest,
} from "../controllers/user.controller.js";

const router = express.Router();

// All routes below require authentication
router.use(protectRoute);

router.get("/", getRecommendedUsers); // GET /users/ - recommended users
router.get("/friends", getMyFriends); // GET /users/friends - friend list

router.post("/friend-request/:id", sendFriendRequest); // POST /users/friend-request/:id
router.put("/friend-request/:id/accept", acceptFriendRequest); // Accept a friend request

router.get("/friend-requests", getFriendRequests); // Incoming and accepted friend requests
router.get("/outgoing-friend-requests", getOutgoingFriendReqs); // Outgoing pending requests

export default router;
