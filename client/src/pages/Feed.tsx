import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Post from "../components/Post";
import CreatePost from "../components/CreatePostButton";
import { type PostType,  type User } from "../types/Post";

function Feed() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const currentUser: User = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchFeed = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${BASE_URL}/api/post/feed`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch feed");
      const data = await res.json();
      setPosts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, [BASE_URL, token]);

  return (
    <div className="bg-gray-800 min-h-screen">
      <NavBar />

      <div className="max-w-3xl mx-auto py-6 px-4">
        <CreatePost
          onPostCreated={fetchFeed}
        />

        {loading && <p className="text-white text-center">Loading posts...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {!loading && !error && posts.length === 0 && (
          <p className="text-gray-300 text-center">No posts yet</p>
        )}

        {posts.map((post) => (
          <Post key={post._id} 
          post={post}
          onLikeToggle={fetchFeed}
          onPostDeleted={fetchFeed}
           />
        ))} 
      </div>
    </div>
  );
}

export default Feed;
