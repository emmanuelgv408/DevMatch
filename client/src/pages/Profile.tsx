import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { type User } from "../types/User";
import { type PostType } from "../types/Post";
import {
  TECH_STACK_OPTIONS,
  LOOKING_FOR_OPTIONS,
} from "../constants/profileOptions";
import Post from "../components/Post";

const Profile = () => {
  const { userId } = useParams<{ userId: string }>();
  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    bio: "",
    techStack: [] as string[],
    lookingFor: "",
  });
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const isOwnProfile = currentUser._id === userId;

  const handleProfileUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const formData = new FormData();

    formData.append("name", editForm.name);
    formData.append("bio", editForm.bio);
    formData.append("techStack", JSON.stringify(editForm.techStack));
    formData.append("lookingFor", editForm.lookingFor);

    if (avatar) {
      formData.append("avatar", avatar);
    }

    const res = await fetch(`${BASE_URL}/api/users/update`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`, // ❗ NO Content-Type
      },
      body: formData,
    });

    const data = await res.json();

    setUser((prev) =>
      prev
        ? {
            ...prev,
            ...data.user,
          }
        : prev
    );

    setIsEditOpen(false);
  };

  const refetchProfile = async () => {
    if (!userId) return;

    const res = await fetch(`${BASE_URL}/api/users/${userId}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setPosts(data.posts || []);
  };

  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/users/${userId}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log(data);
        setUser(data.user);

        setPosts(data.posts || []);
        setIsFollowing(data.isFollowing);
      } catch (err) {
        console.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleFollowToggle = async () => {
    try {
      const endpoint = isFollowing ? "unfollow" : "follow";

      await fetch(`${BASE_URL}/api/users/${endpoint}/${userId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsFollowing(!isFollowing);
      setUser((prev) =>
        prev
          ? {
              ...prev,
              followersCount: prev.followers.length + (isFollowing ? -1 : 1),
            }
          : prev
      );
    } catch (err) {
      console.error("Follow action failed");
    }
  };

  if (loading) {
    return (
      <div className="text-center text-gray-400 mt-10">Loading profile...</div>
    );
  }

  if (!user) {
    return <div className="text-center text-red-400 mt-10">User not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Profile Header */}
      <div className="bg-gray-900 rounded-xl p-6 shadow-md">
        <div className="flex items-center gap-6">
          <img
            src={user.avatar || "/default-avatar.png"}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border border-gray-700"
          />

          <div className="flex-1">
            <h2 className="text-xl font-semibold text-white">{user.name}</h2>
            <p className="text-gray-400 text-sm mt-1">@{user.username}</p>
            <p className="text-gray-400 text-sm mt-1">
              {user.bio || "No bio yet"}
            </p>

            <div className="flex gap-6 mt-3 text-gray-300 text-sm">
              <span>
                <strong className="text-white">{user.followers.length}</strong>{" "}
                Followers
              </span>
              <span>
                <strong className="text-white">{user.following.length}</strong>{" "}
                Following
              </span>
            </div>

            {/* Tech Stack and Looking For */}
            <div className="mt-2 text-gray-300 text-sm space-y-1">
              {user.techStack.length > 0 && (
                <p>
                  <strong className="text-white">Tech Stack:</strong>{" "}
                  {user.techStack.join(", ")}
                </p>
              )}
              {user.lookingFor && (
                <p>
                  <strong className="text-white">Looking for:</strong>{" "}
                  {user.lookingFor}
                </p>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div>
            {isOwnProfile ? (
              <button
                className="px-4 py-1 rounded-md bg-blue-700 hover:bg-blue-800 text-white"
                onClick={() => {
                  setEditForm({
                    name: user.name || "",
                    bio: user.bio || "",
                    techStack: user.techStack || [],
                    lookingFor: user.lookingFor || "",
                  });
                  setIsEditOpen(true);
                }}
              >
                Edit Profile
              </button>
            ) : (
              <button
                onClick={handleFollowToggle}
                className={`px-4 py-1 rounded-md text-white ${
                  isFollowing
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-blue-700 hover:bg-blue-800"
                }`}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="mt-3">
        {posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            onLikeToggle={refetchProfile}
            onPostDeleted={refetchProfile}
          />
        ))}
      </div>
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          {/* Edit Avatar */}
          <div className="bg-gray-900 w-full max-w-md rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">Edit Profile</h3>
            <div className="flex items-center gap-4">
              {/* Avatar Preview */}
              <div className="relative">
                <img
                  src={avatarPreview || user.avatar || "/default-avatar.png"}
                  alt="avatar preview"
                  className="w-20 h-20 rounded-full object-cover border border-gray-700"
                />

                {/* Overlay button */}
                <label className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center rounded-full cursor-pointer transition">
                  <span className="text-sm text-white font-medium">Change</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (!e.target.files?.[0]) return;
                      const file = e.target.files[0];
                      setAvatar(file);
                      setAvatarPreview(URL.createObjectURL(file));
                    }}
                  />
                </label>
              </div>
            </div>
            {/* Name */}
            <input
              className="w-full bg-gray-800 text-white px-3 py-2 rounded-md"
              placeholder="Name"
              value={editForm.name}
              onChange={(e) =>
                setEditForm({ ...editForm, name: e.target.value })
              }
            />

            {/* Bio */}
            <textarea
              className="w-full bg-gray-800 text-white px-3 py-2 rounded-md"
              placeholder="Bio"
              value={editForm.bio}
              onChange={(e) =>
                setEditForm({ ...editForm, bio: e.target.value })
              }
            />

            {/* Tech Stack Presets */}
            <div>
              <p className="text-sm text-gray-300 mb-2">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {TECH_STACK_OPTIONS.map((tech) => {
                  const selected = editForm.techStack.includes(tech);

                  return (
                    <button
                      key={tech}
                      type="button"
                      onClick={() =>
                        setEditForm({
                          ...editForm,
                          techStack: selected
                            ? editForm.techStack.filter((t) => t !== tech)
                            : [...editForm.techStack, tech],
                        })
                      }
                      className={`px-3 py-1 rounded-full text-sm border ${
                        selected
                          ? "bg-blue-700 border-blue-600 text-white"
                          : "bg-gray-800 border-gray-700 text-gray-300"
                      }`}
                    >
                      {tech}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Looking For Presets */}
            <div>
              <p className="text-sm text-gray-300 mb-2">Looking For</p>
              <div className="flex flex-wrap gap-2">
                {LOOKING_FOR_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setEditForm({ ...editForm, lookingFor: option })
                    }
                    className={`px-3 py-1 rounded-full text-sm border ${
                      editForm.lookingFor === option
                        ? "bg-blue-700 border-blue-600 text-white"
                        : "bg-gray-800 border-gray-700 text-gray-300"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setIsEditOpen(false)}
                className="px-4 py-1 text-gray-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleProfileUpdate}
                className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-1 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
