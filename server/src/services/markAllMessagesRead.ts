import Message from "../models/Message";

export async function markAllMessagesAsReadService(
  conversationId: string,
  userId: string
) {
  if (!conversationId || !userId) throw new Error("Invalid parameters");

  
  const result = await Message.updateMany(
    { conversationId, recieverId: userId, read: false },
    { $set: { read: true } }
  );

  return result; 
}
