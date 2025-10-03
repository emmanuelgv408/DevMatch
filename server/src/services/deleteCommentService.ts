import Comment, {IComment} from "../models/Comment";

export async function deleteCommentService(commentId: string, userId: string){

    const comment = await Comment.findById(commentId)
    if (!comment) throw new Error("Cant find comment")


    if(comment.userId.toString() !== userId.toString()){
        throw new Error("Unauthorized to delete this comment")
    }

    await comment.deleteOne();

    return {message: "Comment deleted"}

}