import Notification, { INotification } from "../models/Notification";
import { io, onlineUsers } from "../socket";

export async function createNotificationService(
  userId: string,
  senderId: string,
  type: "like" | "comment" | "follow" | "message",
  postId?: string,
  conversationId?: string
) {
  try {
    if (userId === senderId) throw new Error("Can't notify self");

    const newNotification = new Notification({
      userId,
      senderId,
      type,
      postId,
      conversationId,
    });

    const savedNotification = await newNotification.save();

    const unreadCount = await Notification.countDocuments({
      userId,
      read: false,
    });

    const receiverSocketId = onlineUsers.get(userId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("unreadNotifications", unreadCount);
    }

    return savedNotification;
  } catch (error) {
    throw new Error("Failed to create notification: " + error);
  }
}
