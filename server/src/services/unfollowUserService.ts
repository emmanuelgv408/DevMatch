import User, {IUser}  from "../models/User";
import { Types } from "mongoose";

export async function unfollowUserService(
  followerID: string,
  followingID: string
) {
  const followerUser = await User.findById(followerID.trim());
  const followingUser = await User.findById(followingID.trim());

  if (!followerUser || !followingUser) {
    throw new Error("Cannot find user.");
  }


  if (!followerUser.following.includes(followingUser._id as Types.ObjectId)) {
    throw new Error("User does not follow this user.");
  }


  followerUser.following.pull(followingUser._id as Types.ObjectId);
  followingUser.followers.pull(followerUser._id as Types.ObjectId);

  await followerUser.save();
  await followingUser.save();

  return {
    message: `User ${followerUser._id} unfollowed ${followingUser._id}`,
  };
}
