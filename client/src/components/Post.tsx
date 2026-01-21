import React from "react";

interface PostProps {
  post: any; 
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div className="bg-gray-900 rounded-lg p-4 mb-4 shadow-md">
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
      <p className="text-gray-200">{post.content}</p>
      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="mt-2 w-full max-h-96 object-cover rounded"
        />
      )}
      <p className="text-gray-500 text-xs mt-2">
        {new Date(post.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default Post;
