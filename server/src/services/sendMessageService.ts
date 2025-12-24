import Message, {IMessage} from "../models/Message";
import Conversation, {IConversation} from "../models/Conversation";
import { Types } from "mongoose";

export async function sendMessageService(
  conversationId: string,
  senderId: string,
  receiverId: string,
  text: string
) {

  if (!conversationId || !senderId || !receiverId || !text) {
    throw new Error("Missing required fields.");
  }


  const conversation = await Conversation.findById(conversationId);
  if (!conversation) throw new Error("Conversation not found.");


  const message = await Message.create({
    conversationId,
    senderId,
    receiverId,
    text,
    read: false,
  });


  conversation.lastMessage = message._id as Types.ObjectId;
  conversation.updatedAt = new Date();
  await conversation.save();


  return message;
}
