import { Request, Response } from "express";
import { createUserService } from "../services/createUserService";

export async function createUserController(req: Request, res: Response) {
  try {
    const user = await createUserService(req.body);
    res.status(201).json({user})
  } catch (error: any) {
    res.status(500).json({message: "Error creating user", error: error.message})
  }
}
