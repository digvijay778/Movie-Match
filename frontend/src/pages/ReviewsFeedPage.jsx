// frontend/src/pages/ReviewsFeedPage.js

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createReview, getAllReviews } from "../lib/api";
import { Link } from "react-router-dom"; // Make sure to use react-router-dom
import { Star, Film } from "lucide-react";

// Reusable Review Card Component
const ReviewCard = ({ review }) => (
  <div className="card bg-base-200 text-base-content shadow-md">
    <div className="card-body">
      <div className="flex items-center gap-3 mb-2">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src={review.user.profilePic} alt={review.user.fullName} />
          </div>
        </div>
        <div>
          <Link to={`/profile/${review.user._id}`} className="font-bold hover:underline">
            {review.user.fullName}
          </Link>
          <p className="text-xs opacity-70">{new Date(review.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
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
    </div>
  </div>
);

// Review Form Component
const ReviewForm = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
  const { mutate, isPending } = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      reset();
    },
  });

  const onSubmit = (data) => {
    mutate({ ...data, rating: parseInt(data.rating, 10) });
  };

  return (
    <div className="card bg-base-200 p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Share a Movie Review</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("movieTitle", { required: "Movie title is required" })} placeholder="Movie Title" className="input input-bordered w-full" />
        {errors.movieTitle && <span className="text-error text-sm">{errors.movieTitle.message}</span>}
        
        <select {...register("rating", { required: "Rating is required" })} className="select select-bordered w-full">
          <option value="">Select a rating (1-10)</option>
          {[...Array(10)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1} Stars</option>)}
        </select>
        {errors.rating && <span className="text-error text-sm">{errors.rating.message}</span>}

        <textarea {...register("comment", { required: "Comment is required" })} placeholder="What did you think?" className="textarea textarea-bordered w-full" rows={3}></textarea>
        {errors.comment && <span className="text-error text-sm">{errors.comment.message}</span>}
        
        <button type="submit" className="btn btn-primary" disabled={isPending}>
          {isPending ? "Posting..." : "Post Review"}
        </button>
      </form>
    </div>
  );
};


const ReviewsFeedPage = () => {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: getAllReviews,
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <ReviewForm />
        
        <h2 className="text-3xl font-bold mb-6">Recent Reviews</h2>
        {isLoading ? (
          <div className="text-center py-10"><span className="loading loading-spinner loading-lg"></span></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews?.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsFeedPage;
