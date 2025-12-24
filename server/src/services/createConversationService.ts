import Conversation, { IConversation } from "../models/Conversation";

export async function createConversationService(
  senderId: string,
  receiverId: string
) {
  try {
    if (!senderId || !receiverId) throw Error("Invalid Id");
    const existingConversation = await Conversation.findOne({
      $all: [senderId, receiverId],
    }).populate("participants", "name avatar");
    if (existingConversation) {
      return existingConversation;
    }

    const newConversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
    return newConversation;
  } catch (error) {
    throw Error("Cant create conversation");
  }
}
