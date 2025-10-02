import { Request,Response } from "express";
import { loginUserService } from "../services/loginUserService";

var jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

export async function loginUserController(req: Request, res: Response){

try {

    const user = await loginUserService(req.body );
    const { password, ...userWithoutPassword } = user.toObject();

    const token = jwt.sign(
        { id: user._id, email: user.email }, 
        JWT_SECRET,
        { expiresIn: "1d" } 
      );
  
      return res.status(200).json({
        message: "Login successful",
        token,
        user: userWithoutPassword,
      });

    
} catch (error: any) {
    return res.status(401).json({error: error.message})
}

}
