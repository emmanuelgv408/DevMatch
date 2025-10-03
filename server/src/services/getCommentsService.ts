import Comment, {IComment} from "../models/Comment";

export async function getCommentsService(postId: string){

try {
    
    const comments = await Comment.find({postId})
    .sort({createdAt: 1})
    .populate("userId", "name")

    return comments

} catch (error) {
    throw new Error("Failed to fetch comments")
}


}