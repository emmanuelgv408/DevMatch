import User, { IUser } from "../models/User";
import mongoose, { Model, Types, model } from "mongoose";

export async function getFollowingService(
  userId: string,
  page = 1,
  limit = 10
) {
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid User ID");
    }

    const user = await User.findById(userId).populate({
      //Populates the following with actual objects as its only referencing objectId and not actual User object.
      path: "following",
      select: "name avatar",
      options: {
        skip: (page - 1) * limit,
        limit: limit,
      },
    });

    const fullUser = await User.findById(userId);
    const totalCount = fullUser?.following.length; // Find the total count of followings without pagination.

    if (!user) throw new Error("User not found");

    return {
      following: user.following,
      total: totalCount,
    };
  } catch (error) {
    throw new Error("Unable to get following: " + error);
  }
}
