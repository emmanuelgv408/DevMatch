import express, { Router } from "express";
import { createCommentsController } from "../controllers/commentsController";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/:postId",verifyToken, createCommentsController );

export default router;
