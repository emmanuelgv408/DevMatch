import { Model } from "mongoose";
import User, {IUser}  from "../models/User";
import { Types } from "mongoose";



export async function followUserService(followerID: String, followingID: String) {
    


    const followerUser = await User.findById(followerID.trim());
    const followingUser = await User.findById(followingID.trim());

    if (!followerUser || !followingUser){
        throw Error("Cannot find user.")
    }

    if (followerUser.following.includes(followingUser._id as Types.ObjectId)){
        throw Error("Already following this user.")
    }
  
    followerUser.following.push(followingUser._id as Types.ObjectId);
    followingUser.followers.push(followerUser._id as Types.ObjectId);

    await followingUser.save();
    await followerUser.save();

    return {
        message: `User ${followerUser._id} is now following ${followingUser._id}`
      };


}