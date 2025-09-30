import User, {IUser} from "../models/User"
import jwt from "jsonwebtoken"
const bcrypt = require('bcrypt');

interface LoginResponse {
    user: IUser
    token: string
}


export async function loginUserService(userData: IUser): Promise<LoginResponse>{

try {
    const user = await User.findOne({email: userData.email});
    if (!user) throw new Error("No user with that email found.")
    
    const isMatch = await bcrypt.compare(userData.password, user.password);
    if (!isMatch) throw new Error("Invalid credentials.")

    const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET as string,
        {expiresIn: "1h"}
    );


    return {user, token}

} catch (error) {
    throw new Error("Failed to authenticate user.")
}

}