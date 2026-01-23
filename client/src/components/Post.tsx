import React, { useState } from "react";

interface User {
  _id: string;
  name: string;
  username: string;
  avatar: string;
}

interface Comment {
  _id: string;
  userId: User;
  text: string;
  createdAt: string;
}

interface PostType {
  _id: string;
  userId: User;
  content: string;
  createdAt: string;
  likes: string[];
  comments: Comment[];
  image?: string;
}

interface PostProps {
  post: PostType;
  onLikeToggle: () => void;
}

// Inline SVG components
const LikeIcon = ({ active }: { active: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`w-4 h-4 ${active ? "text-blue-600" : "text-white"}`}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
      4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 
      14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
      6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const CommentIcon = ({ active }: { active: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`w-4 h-4  ${active ? "text-blue-600" : "text-white"}`}
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M21 6h-2v9H5v2h11l4 4V6zM3 4v12h2V4H3zm16 
      0v9h2V4h-2z" />
  </svg>
);


const Post: React.FC<PostProps> = ({ post, onLikeToggle }) => {
  const [likes, setLikes] = useState(post.likes || []);
  const [comments, setComments] = useState<Comment[]>(post.comments || []);
  const [newComment, setNewComment] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const currentUserId = JSON.parse(localStorage.getItem("user") || "{}")._id;
  const isLiked = likes.includes(currentUserId);

  const toggleLike = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/post/${post._id}/like`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to toggle like");

      setLikes((prev) =>
        isLiked ? prev.filter((id) => id !== currentUserId) : [...prev, currentUserId]
      );
      onLikeToggle();
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const addComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await fetch(`${BASE_URL}/api/comment/${post._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({text: newComment }),
      });
      if (!res.ok) throw new Error("Failed to add comment");

      const data = await res.json();
      setComments((prev) => [...prev, data.comment]);
      setNewComment("");
      setShowCommentInput(false);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 mb-4 shadow-md">
      {/* User info */}
      <div className="flex items-center mb-2">
        <img
          src={post.userId.avatar || "/default-avatar.png"}
          alt={post.userId.name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <p className="text-white font-semibold">{post.userId.name}</p>
          <p className="text-gray-400 text-sm">@{post.userId.username}</p>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-200">{post.content}</p>
      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="mt-2 w-full max-h-96 object-cover rounded"
        />
      )}

      {/* Likes & Comment Button */}
      <div className="flex items-center gap-4 mt-3 ">
        <button onClick={toggleLike} className="flex items-center gap-2 ">
          <LikeIcon active={isLiked} />
          <span className="text-white text-sm">{likes.length}</span>
        </button>

        <button
          onClick={() => setShowCommentInput(!showCommentInput)}
          className="flex items-center gap-1"
        >
          <CommentIcon active={showCommentInput} />
          <span className="text-white text-sm">{comments.length}</span>
        </button>
      </div>

      {/* Show comment input if clicked */}
      {showCommentInput && (
        <div className="flex items-center gap-2 mt-2">
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 bg-gray-800 text-white rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addComment}
            className="text-blue-500 text-sm font-semibold"
          >
            Post
          </button>
        </div>
      )}

      {/* Display some comments */}
      <div className="mt-2">
        {(showAllComments ? comments : comments.slice(0, 2)).map((c) => (
          <div key={c._id} className="flex items-start gap-2 mt-1">
            <img
              src={c.userId.avatar || "/default-avatar.png"}
              alt={c.userId.name}
              className="w-6 h-6 rounded-full"
            />
            <div>
              <p className="text-white text-sm">
                <span className="font-semibold">{c.userId.name}</span> {c.text}
              </p>
              <p className="text-gray-500 text-xs">
                {new Date(c.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
        {comments.length > 2 && (
          <button
            className="text-blue-500 text-xs mt-1"
            onClick={() => setShowAllComments(!showAllComments)}
          >
            {showAllComments ? "Hide" : `View all ${comments.length} comments`}
          </button>
        )}
      </div>

      <p className="text-gray-500 text-xs mt-2">
        {new Date(post.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default Post;
