import Post from "../models/Post";
import { Types } from "mongoose";

export async function getPostsByUserService(userId: string) {
  if (!Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID");
  }

  const posts = Post.find({userId}).populate("userId","username name avatar")

  return posts
    .sort({ createdAt: -1 })
    .lean();
}