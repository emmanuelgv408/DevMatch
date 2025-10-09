import mongoose, { Schema, Types, Document } from "mongoose";

export interface INotification extends Document {
  userId: Types.ObjectId;      
  senderId: Types.ObjectId;    
  type: "like" | "comment" | "follow";
  postId?: Types.ObjectId;     
  read: boolean;               
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["like", "comment", "follow"], required: true },
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Notification = mongoose.model<INotification>(
  "Notification",
  notificationSchema
);

export default Notification;
