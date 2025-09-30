import Comment, {IComment} from "../models/Comment";
import Post from "../models/Post";

export async function craeteCommentsService(postId: string, userId: string, text: string) {

const post = await Post.findById(postId);

if(!post) throw new Error("Cant find the post.")

const comment = new Comment({
postId,
userId,
text
})

await comment.save();

return comment
    
}