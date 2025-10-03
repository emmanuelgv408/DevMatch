import { Response, Request } from "express";
import { createCommentsService } from "../services/createCommentsService";
import { deleteCommentService } from "../services/deleteCommentService";

export async function createCommentsController (req: Request, res: Response) {

    try {
       
        const userId = req.currentUser?.id
        const {text} = req.body
        const {postId} = req.params;

        if(!userId) return res.status(401).json({ message: "Unauthorized" });

        const comment = await createCommentsService(postId, userId, text)

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

  

