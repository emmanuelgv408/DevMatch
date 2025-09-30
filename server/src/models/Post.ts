import mongoose, { model, Types, Schema } from "mongoose";


export interface IPost extends mongoose.Document {
  userId: Types.ObjectId;
  content: string;
  createdAt: Date;
  likes: Types.ObjectId[];
  comments: Types.ObjectId[];
  image: string;
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

  createdAt: {
    type: Date,
    default: Date.now,
  },
  image:{
    type: String,
    required:false,
  },

});

const Post = model<IPost>("Post", postSchema);
export default Post;
