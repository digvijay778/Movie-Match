import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { LoaderIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon, CameraIcon, FilmIcon, HeartIcon } from "lucide-react";
import { MOVIE_GENRES } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    favoriteGenres: authUser?.favoriteGenres || [],
    secondaryGenres: authUser?.secondaryGenres || [],
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
    favoriteMovies: authUser?.favoriteMovies || "",
    movieMood: authUser?.movieMood || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully! Ready to connect with fellow movie lovers!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate that at least one favorite genre is selected
    if (formState.favoriteGenres.length === 0) {
      toast.error("Please select at least one favorite movie genre");
      return;
    }

    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1; // 1-100 included
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  const handleGenreSelection = (genre, isMain = true) => {
    const targetField = isMain ? 'favoriteGenres' : 'secondaryGenres';
    const currentGenres = formState[targetField];
    
    if (currentGenres.includes(genre)) {
      // Remove genre if already selected
      setFormState({
        ...formState,
        [targetField]: currentGenres.filter(g => g !== genre)
      });
    } else {
      // Add genre if not selected (limit to 3 for main, 2 for secondary)
      const maxGenres = isMain ? 3 : 2;
      if (currentGenres.length < maxGenres) {
        setFormState({
          ...formState,
          [targetField]: [...currentGenres, genre]
        });
      } else {
        toast.error(`You can select up to ${maxGenres} ${isMain ? 'favorite' : 'secondary'} genres`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-4xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <div className="text-center mb-6">
            <FilmIcon className="size-12 mx-auto text-primary mb-2" />
            <h1 className="text-2xl sm:text-3xl font-bold">Welcome to MovieMatch!</h1>
            <p className="text-base-content/70 mt-2">Connect with fellow movie lovers who share your taste</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* PROFILE PIC CONTAINER */}
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* IMAGE PREVIEW */}
              <div className="size-32 rounded-full bg-base-300 overflow-hidden border-4 border-primary/20">
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>

              {/* Generate Random Avatar BTN */}
              <button type="button" onClick={handleRandomAvatar} className="btn btn-accent btn-sm">
                <ShuffleIcon className="size-4 mr-2" />
                Generate Random Avatar
              </button>
            </div>

            {/* FULL NAME */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formState.fullName}
                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                className="input input-bordered w-full"
                placeholder="Your full name"
                required
              />
            </div>

            {/* BIO */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                className="textarea textarea-bordered h-24"
                placeholder="Tell others about yourself and your movie preferences. What makes you passionate about cinema?"
              />
            </div>

            {/* FAVORITE GENRES */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Favorite Movie Genres</span>
                <span className="label-text-alt">Select up to 3</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {MOVIE_GENRES.map((genre) => (
                  <button
                    key={`favorite-${genre}`}
                    type="button"
                    onClick={() => handleGenreSelection(genre, true)}
                    className={`btn btn-sm ${
                      formState.favoriteGenres.includes(genre)
                        ? 'btn-primary'
                        : 'btn-outline'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* SECONDARY GENRES */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Secondary Interests</span>
                <span className="label-text-alt">Select up to 2</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {MOVIE_GENRES.map((genre) => (
                  <button
                    key={`secondary-${genre}`}
                    type="button"
                    onClick={() => handleGenreSelection(genre, false)}
                    className={`btn btn-sm ${
                      formState.secondaryGenres.includes(genre)
                        ? 'btn-secondary'
                        : 'btn-outline btn-secondary'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* FAVORITE MOVIES */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Favorite Movies</span>
              </label>
              <textarea
                name="favoriteMovies"
                value={formState.favoriteMovies}
                onChange={(e) => setFormState({ ...formState, favoriteMovies: e.target.value })}
                className="textarea textarea-bordered h-20"
                placeholder="List your top 5 favorite movies (e.g., The Godfather, Pulp Fiction, The Dark Knight...)"
              />
            </div>

            {/* MOVIE MOOD */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Movie Mood Preference</span>
              </label>
              <select
                name="movieMood"
                value={formState.movieMood}
                onChange={(e) => setFormState({ ...formState, movieMood: e.target.value })}
                className="select select-bordered w-full"
              >
                <option value="">What mood do you usually seek in movies?</option>
                <option value="escapist">Escapist & Fun</option>
                <option value="thoughtful">Thoughtful & Deep</option>
                <option value="emotional">Emotional & Moving</option>
                <option value="exciting">Exciting & Thrilling</option>
                <option value="romantic">Romantic & Heartwarming</option>
                <option value="dark">Dark & Gritty</option>
                <option value="comedic">Light & Comedic</option>
                <option value="artistic">Artistic & Experimental</option>
              </select>
            </div>

            {/* LOCATION */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  className="input input-bordered w-full pl-10"
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button className="btn btn-primary w-full" disabled={isPending} type="submit">
              {!isPending ? (
                <>
                  <HeartIcon className="size-5 mr-2" />
                  Start Connecting with Movie Lovers
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  Setting up your profile...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
