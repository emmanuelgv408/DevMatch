import express, { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import {
  getConversationsController,
  createConversationController,
  sendMessageController,
  getMessagesController,
  markAllMessagesAsReadController,
} from "../controllers/messagesController";

const router = Router();

router.get("/conversations", verifyToken, getConversationsController);
router.post("/conversations", verifyToken, createConversationController);
router.get("/messages/:conversationId", verifyToken, getMessagesController);
router.post("/messages", verifyToken, sendMessageController);
router.patch("/messages/:conversationId/read", verifyToken, markAllMessagesAsReadController);

export default router;
