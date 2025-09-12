
import Post , {IPost} from "../models/Post";
import User, {IUser} from "../models/User";

export async function createPostService(userId: string, content: string, image?: string) {

    try {
        const user = await User.findById(userId);
        if(!user){
            throw new Error(`User with id ${userId} cannot be found.`)
        }
        
        const newPost = await Post.create({
            userId,
            content,
            image
        })

        return newPost;

    } catch (error) {
        throw new Error("Failed to create post: " + error);
    }



    
}