
export interface User {
    _id: string;
    name: string;
    username: string;
    avatar: string;
  }
  
  export interface Comment {
    _id: string;
    userId: User;
    text: string;
    createdAt: string;
  }
  
  export interface PostType {
    _id: string;
    userId: User;
    content: string;
    createdAt: string;
    likes: string[];
    comments: Comment[];
    image?: string;
  }
  
  export interface PostProps {
    post: PostType;
    onLikeToggle: () => void;
    onPostDeleted?: (postId: string) => void;
  }
  