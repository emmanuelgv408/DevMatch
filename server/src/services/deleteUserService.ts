import { Types } from "mongoose";
import User, { IUser } from "../models/User";

export async function deleteUserService(userId: string) {
  try {
    if (!Types.ObjectId.isValid(userId))
      throw new Error("User Id is not valid");
    const deletedResult = await User.findByIdAndDelete(userId);

    if (!deletedResult){
        throw new Error("User not found or already deleted.")
    }

    return deletedResult;
  } catch (error) {}
}
