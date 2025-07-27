import express, { Router} from "express";
import { createUserController, followUserController, getFollowersController, getFollowingController, unfollowUserController } from "../controllers/userController";
import {verifyToken} from '../middleware/authMiddleware'

const router = Router();


router.post("/", createUserController);
router.post("/:followerID/follow/:followingID", verifyToken, followUserController)
router.post("/:followerID/unfollow/:followingID", verifyToken, unfollowUserController)
router.get("/:userId/followers", verifyToken, getFollowersController );
router.get("/:userId/following", verifyToken, getFollowingController);

export default router;