import { Types, model } from "mongoose";
import User, { IUser } from "../models/User";




export async function getUserByIDService(userID: string) {
  try {
    if (!Types.ObjectId.isValid(userID)) {
      throw new Error("The objectID is not valid format.");
    }
    const user = await User.findById(userID);
    if (!user) {
      throw new Error("Cannot find that user.");
    }
    return {
      name: user.name,
      email: user.email,
      bio: user.bio,
      profileImage: user.avatar,
      followersCount: user.followers.length,
      followingCount: user.following.length,
    };
  } catch (error) {
    throw new Error("Error retrieving the user info " + error)
  }
}
