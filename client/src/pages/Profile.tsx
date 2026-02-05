import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface User {
  _id: string;
  username: string;
  bio?: string;
  profilePic?: string;
  followersCount: number;
  followingCount: number;
}

interface Post {
  _id: string;
  content: string;
  image?: string;
  createdAt: string;
}

const Profile = () => {
  const { userId } = useParams<{ userId: string }>();
  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("userId");
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  const isOwnProfile = currentUserId === userId;

  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/users/${userId}/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
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

      await fetch(
        `${BASE_URL}/api/users/${endpoint}/${userId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsFollowing(!isFollowing);
      setUser((prev) =>
        prev
          ? {
              ...prev,
              followersCount: prev.followersCount + (isFollowing ? -1 : 1),
            }
          : prev
      );
    } catch (err) {
      console.error("Follow action failed");
    }
  };

  if (loading) {
    return <div className="text-center text-gray-400 mt-10">Loading profile...</div>;
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
            src={user.profilePic || "/default-avatar.png"}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border border-gray-700"
          />

          <div className="flex-1">
            <h2 className="text-xl font-semibold text-white">{user.username}</h2>
            <p className="text-gray-400 text-sm mt-1">
              {user.bio || "No bio yet"}
            </p>

            <div className="flex gap-6 mt-3 text-gray-300 text-sm">
              <span>
                <strong className="text-white">{user.followersCount}</strong>{" "}
                Followers
              </span>
              <span>
                <strong className="text-white">{user.followingCount}</strong>{" "}
                Following
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div>
            {isOwnProfile ? (
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1 rounded-md">
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
      <div className="mt-6 space-y-4">
        {posts.length === 0 ? (
          <p className="text-gray-400 text-center">No posts yet</p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-gray-900 p-4 rounded-lg shadow"
            >
              <p className="text-white">{post.content}</p>

              {post.image && (
                <img
                  src={post.image}
                  alt="post"
                  className="mt-3 rounded-md max-h-96 object-cover"
                />
              )}

              <p className="text-gray-500 text-xs mt-2">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
