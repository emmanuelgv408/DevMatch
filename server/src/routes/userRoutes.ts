import express, { Router} from "express";
import { createUserController, followUserController } from "../controllers/userController";
import {verifyToken} from '../middleware/authMiddleware'

const router = Router();


router.post("/", createUserController);
router.post("/:followerID/follow/:followingID", verifyToken, followUserController)


export default router;