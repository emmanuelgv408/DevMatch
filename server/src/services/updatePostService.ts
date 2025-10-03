import { Types } from "mongoose";
import Post, { IPost } from "../models/Post";

export async function updatePostService(
  postId: string,
  update: Partial<IPost>,
  userId: string
) {
  if (!Types.ObjectId.isValid(postId)) throw new Error("Not a valid postId")
  const post = await Post.findById(postId);
  if (!post) throw new Error("Cant find post");
  if (post.userId.toString() !== userId) {
    throw new Error("Unauthorized to update this post");
  }
  Object.assign(post, update);
  await post.save();

  return post;
}
