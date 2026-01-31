import React from "react";
import { type CommentProps } from "../types/Comment";

const TrashIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-4 h-4 text-white`}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M9 3h6l1 2h5v2H3V5h5l1-2zm1 7h2v8h-2v-8zm4 0h2v8h-2v-8zM7 10h2v8H7v-8zm-1 12c-1.1 0-2-.9-2-2V7h16v13c0 1.1-.9 2-2 2H6z" />
    </svg>
  );


const Comment: React.FC<CommentProps> = ({comment , onCommentDeleted,}) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const currentUserId = JSON.parse(localStorage.getItem("user") || "{}")._id;
  const isOwner = comment.userId._id === currentUserId;

  const handleDelete = async () => {
    if (!window.confirm("Delete comment?")) return;

    const res = await fetch(`${BASE_URL}/api/comment/${comment._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Failed to delete comment");

    onCommentDeleted?.(comment._id);
  };

  return (
    <div className="flex items-start gap-2 mt-1">
      <img
        src={comment.userId.avatar}
        alt={comment.userId.name}
        className="w-6 h-6 rounded-full"
      />

      <div className="flex-1">
        <p className="text-white text-sm">
          <span className="font-semibold">{comment.userId.name}</span>{" "}
          {comment.text}
        </p>
        <p className="text-gray-500 text-xs">
          {new Date(comment.createdAt).toLocaleString()}
        </p>
      </div>

      {isOwner && (
        <button onClick={handleDelete} className="text-red-500">
          <TrashIcon/>
        </button>
      )}
    </div>
  );
};

export default Comment;
