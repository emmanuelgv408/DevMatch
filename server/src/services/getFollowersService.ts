
import User, { IUser } from "../models/User";
import mongoose, { Model, Types } from "mongoose";

export async function getFollowersService(
  userId: string,
  page = 1,
  limit = 10
) {
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid User ID");
    }

    const user =  await User.findById(userId).populate({
      path: "followers",
      select: "name avatar",
      options: {
        skip: (page - 1) * limit,
        limit: limit,
      },
    }); 

    const fullUser = await User.findById(userId);
    const totalCount = fullUser?.followers.length; 

    if (!user) throw new Error("User not found");

    return {
     followers: user.followers,
     totalCount: totalCount
    }
  } catch (error) {
    throw new Error("Unable to get followers: " + error);
   
  }
}
