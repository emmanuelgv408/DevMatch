import Post from "../models/Post"
import Comment from "../models/Comment"

export async function deletePostService(postId: string, userId: string) {

    const post = await Post.findById(postId);
    if (!post) throw new Error("Cannot find post")

    if (post.userId.toString() !== userId) {
        throw new Error("Unauthorized: cannot delete someone else's post");
      }
    
     
      await Comment.deleteMany({ postId });
    
  
      await post.deleteOne();
    
}