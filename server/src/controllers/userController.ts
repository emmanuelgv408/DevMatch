import { Request, Response } from "express";
import { createUserService } from "../services/createUserService";
import { followUserService } from "../services/followUserService";
import { unfollowUserService } from "../services/unfollowUserService";

export async function createUserController(req: Request, res: Response) {
  try {
    const user = await createUserService(req.body);
    res.status(201).json({ user });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
}

export async function followUserController(req: Request, res: Response) {
  try {
    const { followerID, followingID } = req.params;

    await followUserService(followerID, followingID);

    res.status(201).json({ message: "Succesfully follwoed user." });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error following user.", error: error.message });
  }
}

export async function unfollowUserController(req: Request, res: Response) {
  try {
    const { followerID, followingID } = req.params;

    await unfollowUserService(followerID, followingID);

  } catch (error: any) {
    res.status(500).json({ message: "Error unfollowing user." });
  }
}
