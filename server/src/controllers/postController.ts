import { Response, Request } from "express";
import { createPostService } from "../services/createPostService";
import { toggleLikesService } from "../services/toggleLikesService";

export async function createPostController(req: Request, res: Response){

    try {
        const userId = req.currentUser?.id

        if(!userId) return res.status(201)
        .json({message: "Unauthorized"})

        const { content, image} = req.body

        const newPost = await createPostService(userId, content, image);
        
        res.status(201).json(newPost);

    } catch (error: any) {
        res.status(500)
        .json({message: "Error creating post: ", error: error.message})
    }

}

export async function toggleLikesController (req: Request, res: Response){

    try {

        const {postId} = req.params;
        const userId = req.currentUser?.id

        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        
        const updatedPost = toggleLikesService(postId, userId);
        res.status(200).json(updatedPost);

        
    } catch (error: any) {
        res.status(500)
        .json({message: "Error liking post", error: error.message })
    }
} 


