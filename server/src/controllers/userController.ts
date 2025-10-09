import { Request, Response } from "express";
import { createUserService } from "../services/createUserService";
import { followUserService } from "../services/followUserService";
import { unfollowUserService } from "../services/unfollowUserService";
import { getFollowersService } from "../services/getFollowersService";
import { getFollowingService } from "../services/getFollowingService";
import { getUserByIDService } from "../services/getUserByIDService";
import { updateUserService } from "../services/updateUserService";
import { deleteUserService } from "../services/deleteUserService";
import { searchUserService } from "../services/searchUserService";
import { createNotificationService } from "../services/createNotificationService";

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
    const followerID = req.currentUser?.id

    if(!followerID) return res.status(401)
    .json({message: "Unauthorized"})

    const { followingID } = req.params;

    await followUserService(followerID, followingID);
    await createNotificationService(followingID, followerID, "follow");

    res.status(201).json({ message: "Succesfully followed user." });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error following user.", error: error.message });
  }
}

export async function unfollowUserController(req: Request, res: Response) {
  try {
    const followerID = req.currentUser?.id

    if(!followerID) return res.status(401)
    .json({message: "Unauthorized"})

    const { followingID } = req.params;

    await unfollowUserService(followerID, followingID);
  } catch (error: any) {
    res.status(500).json({ message: "Error unfollowing user." });
  }
}

export async function getFollowersController(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const followers = await getFollowersService(userId);

    res.status(200).json({ followers });
  } catch (error: any) {
    res.status(500).json({ message: "Error getting followers.", error: error.message });
  }
}

export async function getFollowingController(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const followers = await getFollowingService(userId);

    res.status(200).json({ followers });
  } catch (error: any) {
    res.status(500).json({ message: "Error getting followers.", error: error.message });
  }
}

export async function getUserByIDController(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const user = await getUserByIDService(userId);

    res.status(200).json({ user });
  } catch (error: any) {
    res.status(500).json({ message: "Error retreiving profile info." , error: error.message});
  }
}

export async function updateUserController(req: Request, res: Response) {
  try {
    const userId = req.currentUser?.id;
    const { update } = req.body;

    if(!userId) return res.status(201)
    .json({message: "Unauthorized"})

    const updatedUser = await updateUserService(userId, update);

    res.status(200).json({
      message: "Succesfully updated user.",
      user: updatedUser,
    });
  } catch (error: any) {
    res.status(500).json({ message: "Error updating the user." , error: error.message});
  }
}

export async function deleteUserController(req: Request, res: Response) {
  try {
    const userId = req.currentUser?.id

    if (!userId) return res.status(401)
    .json({message: "Unauthorized"})
    const deletedUser = await deleteUserService(userId);

    res.status(200).json({ deletedUser });
  } catch (error: any) {
    res.status(500).json({ message: "Unable to delete the user", error: error.message});
  }
}

export async function searchUserController(req: Request, res: Response){

try {
  const {query, page = 1, limit = 10}= req.params;
  const users = await searchUserService(query as string, parseInt(page as string), parseInt(limit as string)); // Request values are always strings so we must parse!

  res.status(200).json({users});

} catch (error: any) {
  res.status(500).json({message: "Cannot search for the user.", error: error.message
})
  }

}

