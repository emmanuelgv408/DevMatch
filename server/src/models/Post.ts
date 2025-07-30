import mongoose, { model, Types, Schema } from "mongoose";


interface IPost extends mongoose.Document {
  userId: Types.ObjectId;
  content: string;
  createdAt: Date;
  likes: Types.ObjectId[];
  comments: Types.ObjectId[];
}

const postSchema = new Schema<IPost>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = model<IPost>("Post", postSchema);
export default Post;
