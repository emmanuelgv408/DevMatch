import React, { useState } from "react";

interface CreatePostProps {
  onPostCreated: (newPost: any) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async () => {
    if (!content && !image) return; 
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("content", content);
      if (image) formData.append("image", image);
      console.log
      const res = await fetch(`${BASE_URL}/api/post`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to create post");

      const data = await res.json();
      onPostCreated(data.post); 
      setContent("");
      setImage(null);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 mb-4 shadow-md">
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        rows={3}
      />
      <div className="flex items-center mt-2 justify-between">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && setImage(e.target.files[0])}
          className="text-sm text-gray-300"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-700 text-white px-4 py-1 rounded-md hover:bg-blue-800 transition disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
      {image && <p className="text-gray-300 mt-1 text-sm">{image.name}</p>}
    </div>
  );
};

export default CreatePost;