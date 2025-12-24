import mongoose, {Schema, Document, Types} from "mongoose";

export interface IMessage extends Document {
    conversationId: Types.ObjectId,
    senderId: Types. ObjectId,
    receiverId: Types.ObjectId,
    text: string,
    createdAt : Date,
    read: boolean
}

const messageSchema = new Schema<IMessage> ({

    conversationId: {
        type: Schema.Types.ObjectId,
        ref: "Conversation",
        required: true,
        index: true,
      },
      senderId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      receiverId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      text: {
        type: String,
        required: true,
        trim: true,
      },
      read: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
);

const Message = mongoose.model<IMessage>("Message", messageSchema);
export default Message;