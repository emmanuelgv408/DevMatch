import { Response, Request } from "express";
import { createCommentsService } from "../services/createCommentsService";
import { deleteCommentService } from "../services/deleteCommentService";
import Post from "../models/Post";
import { createNotificationService } from "../services/createNotificationService";

export async function createCommentsController (req: Request, res: Response) {

    try {
       
        const userId = req.currentUser?.id
        const {text} = req.body
        const {postId} = req.params;

        if(!userId) return res.status(401).json({ message: "Unauthorized" });

        const comment = await createCommentsService(postId, userId, text)
        const post = await Post.findById(postId)

        if(post && post?.userId.toString() !== userId){
          await createNotificationService(post.userId.toString(), userId, "comment", postId)
        }

        res.status(201).json(comment)
        
    } catch (error: any) {
        res.status(500)
        .json({message: "Error creating comment", error: error.message })
    }

    
}


export async function deleteCommentController(req: Request, res: Response) {
    try {
      const { commentId } = req.params;
      const userId = req.currentUser?.id;
  
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      const result = await deleteCommentService(commentId, userId);
  
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500)
      .json({
        message: "Error deleting comment", error: error.message,
      });
    }
  }

  

