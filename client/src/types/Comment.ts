
export interface User {
    _id: string;
    name: string;
    username: string;
    avatar: string;
  }
  

export interface CommentType {
    postId: string
    _id: string;
    userId: User;
    text: string;
    createdAt: string;
  }
  
  export interface CommentProps{
    comment: CommentType;
    onCommentDeleted?: (commentId: string) => void;
  }
    