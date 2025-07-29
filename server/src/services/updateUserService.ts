import { Types, model } from "mongoose";
import User, { IUser } from "../models/User";


const bcrypt = require("bcrypt");

export async function updateUserService(userId: string, update: Partial<IUser>){

    if (!Types.ObjectId.isValid(userId)) throw new Error("That is not a valid ID");
    const user = await User.findById(userId);
    if (!user) throw new Error("User cannot be found.")

    if (update.password){
        const salt = await  bcrypt.genSalt(10);
        update.password = await bcrypt.hash(update.password, salt);
    }

    Object.assign(user,update);
    await user.save();

    return {
        name: user.name,
        email: user.email,
        bio: user.bio,
        avatar: user.avatar,
        techStack: user.techStack,
        experienceLevel: user.experienceLevel,
        lookingFor: user.lookingFor
      };
    

}