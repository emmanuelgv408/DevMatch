import Conversation, {IConversation} from "../models/Conversation";


export async function getConversationService(userId: string) {

    if (!userId) throw Error("Cannot Find User.")

    try {
        const conversations = await Conversation.find({participants: userId})
        .sort({updatedAt: -1})
        .populate("participants","name avatar")
        return conversations
    } catch (error) {
        throw Error ("Failed to get user conversations.")
    }


    
}
