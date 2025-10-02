import { Response, Request } from "express";
import { createCommentsService } from "src/services/createCommentsService";

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
