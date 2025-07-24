const jwt = require("jsonwebtoken");
import { NextFunction, Request, Response } from "express";
import { access } from "fs";
import { send } from "process";

const JWT_SECRET = process.env.JWT_SECRET;

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
const token = req.body.token || req.query.token || req.headers
['x-access-token'];

if (!token){
    return res.status(403).send("An authentication token is required.");
}

try {
    const decodedToken = await jwt.verify(token, JWT_SECRET);
    req.currentUser = decodedToken;
  
} catch (error) {
    return res.status(401).send("Invalid Token Provided")
}

 return next();

}
