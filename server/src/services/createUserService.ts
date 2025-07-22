import User, {IUser}  from "../models/User";

const bcrypt = require('bcrypt');


export async function createUserService(userData:IUser): Promise<IUser> {
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;
        const newUser = new User(userData);
        const savedUser = await newUser.save();
        return savedUser;
    } catch (error) {
        throw new Error("Failed to create user:" + error)
    }


}