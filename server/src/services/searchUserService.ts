import { Types, model } from "mongoose";
import User, { IUser } from "../models/User";

export async function searchUserService(query: string, page = 1, limit = 10){

if(!query || query.trim() == "") throw new Error("Search query cannot be empty")

const users = await User.find({
    name: {$regex: query, $options: 'i'},
    options: {
        skip: (page - 1 * limit), 
        limit: limit
    }
}).select("-password -email -__v");

return users;


}