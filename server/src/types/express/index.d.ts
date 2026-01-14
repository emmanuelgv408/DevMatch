import { JwtPayload } from "jsonwebtoken";
import 'express'

declare global {
  namespace Express {
    interface Request {
      currentUser?: {id: string}; 
    }
  }
}

export {}
