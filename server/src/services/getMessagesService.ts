import Message, { IMessage } from "../models/Message";

export async function getMessagesService(conversationId: string): Promise<IMessage[]> {
  if (!conversationId) throw new Error("Conversation ID is required");
  try {
    const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });
    return messages;
  } catch (error) {
    throw Error("Failed to get messages.")
  }

}
