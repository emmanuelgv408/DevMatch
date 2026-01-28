import Comment, {IComment} from "../models/Comment";
import Post from "../models/Post";

export async function createCommentsService(postId: string, userId: string, text: string) {

const post = await Post.findById(postId);

if(!post) throw new Error("Cant find the post.")

const comment = await new Comment({
postId,
userId,
text
})

await comment.populate("userId","name avatar username")
await comment.save();




return comment
    
}