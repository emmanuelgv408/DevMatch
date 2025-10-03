import { Response, Request } from "express";
import { createPostService } from "../services/createPostService";
import { toggleLikesService } from "../services/toggleLikesService";
import { deletePostService } from "../services/deletePostService";
import { getCommentsService } from "../services/getCommentsService";
import { updatePostService } from "src/services/updatePostService";
import { getFeedService } from "src/services/getFeedService.";

export async function createPostController(req: Request, res: Response) {
  try {
    const userId = req.currentUser?.id;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { content, image } = req.body;

    const newPost = await createPostService(userId, content, image);

    res.status(201).json(newPost);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error creating post: ", error: error.message });
  }
}

export async function toggleLikesController(req: Request, res: Response) {
  try {
    const { postId } = req.params;
    const userId = req.currentUser?.id;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const updatedPost = toggleLikesService(postId, userId);
    res.status(200).json(updatedPost);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error liking post", error: error.message });
  }
}

export async function deletePostController(req: Request, res: Response) {
  try {
    const { postId } = req.params;
    const userId = req.currentUser?.id;

    if (!postId) throw new Error("Cant find post");
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const result = await deletePostService(postId, userId);
    res.status(200).json(result);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error deleting post", error: error.message });
  }
}

export async function getCommentsController(req: Request, res: Response) {
  try {
    const { postId } = req.params;

    if (!postId) throw new Error("Cant find post");

    const comments = await getCommentsService(postId);

    res.status(200).json({ comments });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error getting comments", error: error.message });
  }
}

export async function updatePostController(req: Request, res: Response) {
  try {
    const { postId } = req.params;
    const update = req.body;
    const userId = req.currentUser?.id;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const updatedPost = await updatePostService(postId, update, userId);

    return res.status(200).json(updatedPost);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error updating post", error: error.message });
  }
}

export async function getFeedController(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const userId = req.currentUser?.id;
    if (!userId) throw new Error("Cant find user");

    const feed = await getFeedService(userId, page, limit);

    return res.status(200).json(feed);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error getting feed", error: error.message });
  }
}
