import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon, FilmIcon, HeartIcon } from "lucide-react";
import { capitialize } from "../lib/utils";
import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const getGenreBadge = (genre) => (
  <span className="badge badge-secondary text-base-content mr-1">{capitialize(genre)}</span>
);

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-base-100 text-base-content min-h-screen">
      <div className="container mx-auto space-y-10">
        {/* Friends Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-base-content">Your Movie Friends</h2>
          <Link to="/notifications" className="btn btn-outline btn-sm">
            <UsersIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>

        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        {/* Recommendations Section */}
        <section>
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-base-content">Meet Movie Lovers</h2>
                <p className="opacity-70 text-base-content">
                  Discover people who share your favorite movie genres and connect instantly!
                </p>
              </div>
            </div>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg text-primary" />
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="card bg-base-200 p-6 text-center text-base-content">
              <h3 className="font-semibold text-lg mb-2">No recommendations available</h3>
              <p className="opacity-70">
                Check back later for new movie buddies!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                return (
                  <div
                    key={user._id}
                    className="card bg-base-200 text-base-content hover:shadow-lg transition-all duration-300"
                  >
                    <div className="card-body p-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="avatar size-16 rounded-full">
                          <img src={user.profilePic} alt={user.fullName} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg flex items-center gap-1 text-base-content">
                            <FilmIcon className="size-4 text-yellow-500" />
                            {user.fullName}
                          </h3>
                          {user.location && (
                            <div className="flex items-center text-xs opacity-70 mt-1 text-base-content">
                              <MapPinIcon className="size-3 mr-1" />
                              {user.location}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Genres */}
                      <div className="flex flex-wrap gap-1.5">
                        {user.favoriteGenres && user.favoriteGenres.length > 0 && (
                          <span className="badge badge-primary text-base-content">
                            <HeartIcon className="size-3 mr-1" />
                            Favorite:{" "}
                            {user.favoriteGenres.map((g) => getGenreBadge(g))}
                          </span>
                        )}
                        {user.secondaryGenres && user.secondaryGenres.length > 0 && (
                          <span className="badge badge-outline text-base-content">
                            Also Likes:{" "}
                            {user.secondaryGenres.map((g) => getGenreBadge(g))}
                          </span>
                        )}
                      </div>

                      {/* Movie Mood */}
                      {user.movieMood && (
                        <div className="text-xs opacity-80 text-base-content">
                          <span className="font-semibold">Movie Mood:</span> {user.movieMood}
                        </div>
                      )}

                      {/* Bio */}
                      {user.bio && <p className="text-sm opacity-70 text-base-content">{user.bio}</p>}

                      {/* Action button */}
                      <button
                        className={`btn w-full mt-2 ${
                          hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                        } `}
                        onClick={() => sendRequestMutation(user._id)}
                        disabled={hasRequestBeenSent || isPending}
                      >
                        {hasRequestBeenSent ? (
                          <>
                            <CheckCircleIcon className="size-4 mr-2" />
                            Request Sent
                          </>
                        ) : (
                          <>
                            <UserPlusIcon className="size-4 mr-2" />
                            Add Movie Friend
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
