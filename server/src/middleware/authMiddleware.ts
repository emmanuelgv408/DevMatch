const jwt = require("jsonwebtoken");
import { NextFunction, Request, Response } from "express";


const JWT_SECRET = process.env.JWT_SECRET;

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    let token;

if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else {
    token = req.body.token || req.query.token || req.headers['x-access-token'];
  }

try {
    const decodedToken = await jwt.verify(token, JWT_SECRET);
    (req as any).currentUser = decodedToken;
  
} catch (error) {
    return res.status(401).send("Invalid Token Provided")
}

 return next();

}
