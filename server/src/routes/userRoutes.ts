import express, { Router} from "express";
import { createUserController, deleteUserController, followUserController, getFollowersController, getFollowingController, getUserByIDController, searchUserController, unfollowUserController, updateUserController } from "../controllers/userController";
import {verifyToken} from '../middleware/authMiddleware'

const router = Router();


router.post("/", createUserController);
router.post("/:followerID/follow/:followingID", verifyToken, followUserController)
router.post("/:followerID/unfollow/:followingID", verifyToken, unfollowUserController)
router.get("/:userId/followers", verifyToken, getFollowersController );
router.get("/:userId/following", verifyToken, getFollowingController);
router.get("/:userId/profile", verifyToken, getUserByIDController);
router.post("/userId/update", verifyToken, updateUserController);
router.delete("/userId/delete", verifyToken, deleteUserController);
router.get("/search", verifyToken, searchUserController);


export default router;