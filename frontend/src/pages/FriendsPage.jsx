import { useEffect, useState } from "react";
import { UserPlus, Search, MessageCircle, Film, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getUserFriends } from "../lib/api";

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFriends() {
      try {
        setError("");
        setLoading(true);
        const data = await getUserFriends();
        setFriends(data || []);
      } catch (err) {
        setError("Failed to load friends. Please try again.");
        setFriends([]);
      } finally {
        setLoading(false);
      }
    }
    fetchFriends();
  }, []);

  const filteredFriends = friends.filter(
    (f) =>
      f.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      f.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleStartChat = (friendId) => {
    navigate(`/chat/${friendId}`);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-base-100 text-base-content min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-primary">Your Movie Friends</h1>
        <button className="btn btn-secondary flex items-center gap-2">
          <UserPlus size={18} />
          Add Friend
        </button>
      </div>
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search friends..."
            className="input input-bordered w-full pl-10 text-base-content bg-base-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={20} />
        </div>
      </div>
      <div className="bg-base-100 rounded-xl shadow divide-y divide-base-200 text-base-content">
        {loading ? (
          <div className="p-8 text-center text-base opacity-60">Loading...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">{error}</div>
        ) : filteredFriends.length === 0 ? (
          <div className="p-8 text-center text-base opacity-60">No friends found.</div>
        ) : (
          filteredFriends.map((friend) => (
            <div key={friend._id} className="flex items-center gap-4 p-4 hover:bg-base-200 transition text-base-content">
              <div className="relative">
                <img
                  src={
                    friend.profilePic ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.fullName || "User")}`
                  }
                  alt={friend.fullName || "User"}
                  className="w-14 h-14 rounded-full border-2 border-primary object-cover"
                />
                <span
                  className={`absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-white bg-gray-400`}
                  title="Offline"
                />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-lg flex items-center gap-1 text-base-content">
                  <Film size={16} className="text-yellow-500" />
                  {friend.fullName}
                </div>
                <div className="text-sm opacity-70 flex flex-wrap gap-2 mt-1 text-base-content">
                  {friend.favoriteGenres && friend.favoriteGenres.length > 0 ? (
                    <span className="flex items-center gap-1">
                      <Heart size={14} className="text-pink-500" />
                      {friend.favoriteGenres.join(", ")}
                    </span>
                  ) : (
                    <span>No genres listed</span>
                  )}
                </div>
                {friend.movieMood && (
                  <div className="text-xs opacity-60 mt-1 text-base-content">
                    <span className="font-semibold">Movie Mood:</span> {friend.movieMood}
                  </div>
                )}
              </div>
              <button
                className="btn btn-sm btn-primary flex items-center gap-1"
                onClick={() => handleStartChat(friend._id)}
              >
                <MessageCircle size={16} />
                Chat
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FriendsPage;
