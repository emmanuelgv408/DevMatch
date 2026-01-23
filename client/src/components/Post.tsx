import React, { useState } from "react";
import toast from "react-hot-toast";

interface PostProps {
  post: any; // Can type this properly later
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [likes, setLikes] = useState(post.likes || []);
  const [loadingLike, setLoadingLike] = useState(false);

  const token = localStorage.getItem("token");
  const userId = JSON.parse(localStorage.getItem("user") || "{}")._id;

  const handleLike = async () => {
    if (!token) return toast.error("You must be logged in");

    setLoadingLike(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/post/${post._id}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to like post");

      // Toggle like locally
      if (likes.includes(userId)) {
        setLikes(likes.filter((id: string) => id !== userId));
      } else {
        setLikes([...likes, userId]);
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoadingLike(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 mb-4 shadow-md">
      {/* User Info */}
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


      {/* Timestamp */}
      <p className="text-gray-500 text-xs mt-2">
        {new Date(post.createdAt).toLocaleString()}
      </p>

       {/* Actions: Like & Comment */}
       <div className="flex items-center gap-4 mt-3 text-gray-400 text-sm">
        <button
          onClick={handleLike}
          disabled={loadingLike}
          className={`flex items-center gap-1 ${
            likes.includes(userId) ? "text-blue-500" : "hover:text-white"
          }`}
        >
          👍 {likes.length}
        </button>
        <div className="flex items-center gap-1 cursor-pointer hover:text-white">
          💬 {post.comments.length}
        </div>
      </div>
    </div>

     
  );


     
};

export default Post;
