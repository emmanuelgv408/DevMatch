import User, {IUser} from "../models/User"

const bcrypt = require('bcrypt');

export async function loginUserService(userData: IUser): Promise<IUser>{

try {
    const user = await User.findOne({email: userData.email});
    if (!user) throw new Error("No user with that email found.")
    
    const isMatch = await bcrypt.compare(userData.password, user.password);
    if (!isMatch) throw new Error("Invalid credentials.")

    return user;
} catch (error) {
    throw new Error("Failed to authenticate user.")
}

}