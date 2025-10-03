import express, { Router } from "express";
import { createCommentsController, deleteCommentController } from "../controllers/commentsController";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/",verifyToken, createCommentsController );
router.delete("/:commentId", verifyToken, deleteCommentController)

export default router;
