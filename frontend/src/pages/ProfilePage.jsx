// frontend/src/pages/ProfilePage.js

import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { getUserProfile, getReviewsByUser } from "../lib/api";
import { Film, Star, Heart, MapPinIcon } from "lucide-react";

// Reusing the ReviewCard from the ReviewsFeedPage would be ideal,
// but for simplicity, we define it here again.
const ReviewCard = ({ review }) => (
    <div className="card bg-base-300 text-base-content shadow-md">
      <div className="card-body">
        <h3 className="text-xl font-semibold flex items-center gap-2">
            <Film className="size-5 text-yellow-500" />
            {review.movieTitle}
        </h3>
        <div className="flex items-center gap-1 text-yellow-400">
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} size={20} fill="currentColor" />
          ))}
          {[...Array(10 - review.rating)].map((_, i) => (
            <Star key={i} size={20} />
          ))}
        </div>
        <p className="mt-2 text-base-content opacity-90">{review.comment}</p>
        <p className="text-xs opacity-70 mt-2">{new Date(review.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );


const ProfilePage = () => {
  const { userId } = useParams();

  const { data: user, isLoading: loadingProfile } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => getUserProfile(userId),
  });

  const { data: reviews, isLoading: loadingReviews } = useQuery({
    queryKey: ["userReviews", userId],
    queryFn: () => getReviewsByUser(userId),
    enabled: !!user, // Only run this query after the user profile has been fetched
  });
  
  if (loadingProfile) {
    return <div className="text-center py-20"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  if (!user) {
    return <div className="text-center py-20"><h2>User not found.</h2></div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-base-100">
      <div className="container mx-auto">
        {/* Profile Header */}
        <div className="card bg-base-200 p-6 sm:p-8 mb-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="avatar">
                    <div className="w-24 sm:w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={user.profilePic} alt={user.fullName} />
                    </div>
                </div>
                <div className="text-center sm:text-left">
                    <h1 className="text-3xl sm:text-4xl font-bold">{user.fullName}</h1>
                    {user.location && (
                        <p className="flex items-center justify-center sm:justify-start gap-2 mt-2 opacity-70">
                            <MapPinIcon size={16} /> {user.location}
                        </p>
                    )}
                    {user.bio && <p className="mt-4 max-w-lg">{user.bio}</p>}
                </div>
            </div>
            <div className="divider"></div>
            <div className="flex flex-wrap gap-2">
                <span className="font-semibold">Favorite Genres:</span>
                {user.favoriteGenres.map(genre => (
                    <div key={genre} className="badge badge-secondary gap-1">
                        <Heart size={14}/> {genre}
                    </div>
                ))}
            </div>
        </div>
        
        {/* User's Reviews */}
        <h2 className="text-2xl font-bold mb-6">Reviews by {user.fullName}</h2>
        {loadingReviews ? (
          <div className="text-center py-10"><span className="loading loading-spinner loading-md"></span></div>
        ) : reviews && reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        ) : (
          <div className="card bg-base-200 p-6 text-center">
            <p>{user.fullName} hasn't written any reviews yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
