import Post from "../models/Post";

export async function toggleLikesService(postId: string, userId: string){

const post = await Post.findById(postId);
if (!post){
    throw new Error("Post not found.")
}

const hasLiked = post.likes.includes(userId as any);

if (hasLiked){
    post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
    );
}
else{
    post.likes.push(userId as any)
}

await post.save();
return post;

}