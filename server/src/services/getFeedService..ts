import User, { IUser } from "../models/User";
import Post, { IPost } from "../models/Post";

export async function getFeedService(userId: string, page = 1, limit = 10) {
  const user = await User.findById(userId);
  if (!user) throw new Error("Cant find user");

  const following = user.following;

  const usersToFetchFrom = [...following, user._id];

  const posts = await Post.find({ userId: { $in: usersToFetchFrom } })
  .sort({createdAt: -1,})
  .skip((page - 1 ) * limit)
  .limit(limit)
  .populate("userId", "name avatar username");

  return posts;
}
