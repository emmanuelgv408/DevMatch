import express, { Router} from "express";
import { createUserController, followUserController, unfollowUserController } from "../controllers/userController";
import {verifyToken} from '../middleware/authMiddleware'

const router = Router();


router.post("/", createUserController);
router.post("/:followerID/follow/:followingID", verifyToken, followUserController)
router.post("/:followerID/unfollow/:followingID", verifyToken, unfollowUserController)

export default router;