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
      {/* Textarea */}
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        rows={3}
      />

      {/* Image preview */}
      {image && (
        <div className="mt-3 relative">
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="max-h-64 w-full object-cover rounded-md"
          />
          <button
            onClick={() => setImage(null)}
            className="absolute top-2 right-2 bg-black/70 text-white rounded-full px-2 py-1 text-xs hover:bg-black"
          >
            ✕
          </button>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between mt-3">
        {/* Hidden file input */}
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          hidden
          onChange={(e) =>
            e.target.files && setImage(e.target.files[0])
          }
        />

        {/* Styled upload button */}
        <label
          htmlFor="image-upload"
          className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-white transition text-sm"
        >
          📷 <span>Add photo</span>
        </label>

        {/* Post button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-700 text-white px-4 py-1.5 rounded-md hover:bg-blue-800 transition disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
