import mongoose, {Schema, Types, Model} from "mongoose";
import User from "./User";


export interface IConversation extends Document {
    participants: Types.ObjectId[],
    lastMessage: Types.ObjectId,
    updatedAt : Date
}

const conversationSchema = new Schema<IConversation> ({

    participants: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }],
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    },
    { timestamps: true }
);
  
  
  conversationSchema.index({ participants: 1 });
  conversationSchema.index({ updatedAt: -1 });

  const Conversation = mongoose.model<IConversation>(
    "Conversation",
    conversationSchema
  );
  
  export default Conversation;