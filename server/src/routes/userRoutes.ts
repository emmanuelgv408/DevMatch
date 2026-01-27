import express, { Router} from "express";
import { createUserController, deleteUserController, followUserController, getFollowersController, getFollowingController, getUserByIDController, searchUserController, unfollowUserController, updateUserController,uploadProfilePicController } from "../controllers/userController";
import {verifyToken} from '../middleware/authMiddleware'
import parser from "../middleware/upload";

const router = Router();


router.post("/", createUserController);
router.post("/follow/:followingID", verifyToken, followUserController)
router.post("/unfollow/:followingID", verifyToken, unfollowUserController)
router.get("/:userId/followers", verifyToken, getFollowersController );
router.get("/:userId/following", verifyToken, getFollowingController);
router.get("/:userId/profile", verifyToken, getUserByIDController);
router.post("/update", verifyToken, updateUserController);
router.delete("/delete", verifyToken, deleteUserController);
router.get("/search", verifyToken, searchUserController);
router.put("/profile-pic", verifyToken, parser.single("image"), uploadProfilePicController);



export default router;