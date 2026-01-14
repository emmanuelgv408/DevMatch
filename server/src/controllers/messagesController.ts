import { Request, Response } from "express";
import { getConversationService } from "../services/getConversationService";
import { createConversationService } from "../services/createConversationService";
import { sendMessageService } from "../services/sendMessageService";
import { getMessagesService } from "../services/getMessagesService";
import { markAllMessagesAsReadService } from "../services/markAllMessagesRead";
import { createNotificationService } from "../services/createNotificationService";
import { io } from "../server";
import { onlineUsers } from "../socket";
import Conversation from "../models/Conversation";

export async function getConversationsController(req: Request, res: Response) {
  try {
    const userId = req.currentUser?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const conversations = await getConversationService(userId);
    return res.status(200).json(conversations);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error fetching conversations", error: error.message });
  }
}

export async function createConversationController(
  req: Request,
  res: Response
) {
  try {
    const senderId = req.currentUser?.id;
    const { receiverId } = req.body;

    if (!senderId) return res.status(401).json({ message: "Unauthorized" });
    if (!receiverId)
      return res.status(400).json({ message: "Receiver ID required" });

    const conversation = await createConversationService(senderId, receiverId);
    return res.status(201).json(conversation);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error creating conversation", error: error.message });
  }
}

export async function sendMessageController(req: Request, res: Response) {
  try {
    const senderId = req.currentUser?.id;
    const { conversationId, text, receiverId } = req.body;

    if (!senderId) return res.status(401).json({ message: "Unauthorized" });
    if (!conversationId || !text)
      return res
        .status(400)
        .json({ message: "Conversation ID and text required" });

    const message = await sendMessageService(
      conversationId,
      senderId,
      receiverId,
      text
    );

    if (senderId !== receiverId) {
      await createNotificationService(
        receiverId,
        senderId,
        "message",
        undefined,
        conversationId
      );
    }
    const receiverSocketId = onlineUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", message);
    }
    return res.status(201).json(message);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error sending message", error: error.message });
  }
}

export async function getMessagesController(req: Request, res: Response) {
  try {
    const { conversationId } = req.params;
    if (!conversationId)
      return res.status(400).json({ message: "Conversation ID required" });

    const messages = await getMessagesService(conversationId);
    return res.status(200).json(messages);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error fetching messages", error: error.message });
  }
}

export async function markAllMessagesAsReadController(req: Request,res: Response) {
  try {
    const userId = req.currentUser?.id;
    const { conversationId } = req.params;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!conversationId)
      return res.status(400).json({ message: "Conversation ID required" });

    await markAllMessagesAsReadService(conversationId, userId);

    const conversation = await Conversation.findById(conversationId);
    if (conversation) {
      conversation.participants.forEach((participantId) => {
        if (participantId.toString() !== userId) {
          const socketId = onlineUsers.get(participantId.toString());
          if (socketId) {
            io.to(socketId).emit("messagesRead", {
              conversationId,
              readerId: userId,
            });
          }
        }
      });
    }
    return res.status(200).json({ message: "Messages marked as read"});
  } catch (error: any) {
    return res.status(500).json({
      message: "Error marking messages as read",
      error: error.message,
    });
  }
}
