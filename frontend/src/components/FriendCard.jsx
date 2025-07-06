import { Link } from "react-router";
import { Heart, Film } from "lucide-react";

const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        {/* USER INFO */}
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12">
            <img src={friend.profilePic} alt={friend.fullName} />
          </div>
          <h3 className="font-semibold truncate flex items-center gap-1">
            <Film className="h-4 w-4 text-yellow-500" />
            {friend.fullName}
          </h3>
        </div>

        {/* FAVORITE GENRES */}
        {friend.favoriteGenres && friend.favoriteGenres.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            <span className="badge badge-secondary text-xs flex items-center gap-1">
              <Heart className="h-3 w-3 text-pink-500" />
              {friend.favoriteGenres.join(", ")}
            </span>
          </div>
        )}

        {/* MOVIE MOOD */}
        {friend.movieMood && (
          <div className="text-xs opacity-70 mb-2">
            <span className="font-semibold">Movie Mood:</span> {friend.movieMood}
          </div>
        )}

        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
          Message
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;
