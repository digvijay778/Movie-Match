import { Film } from "lucide-react";

const NoFriendsFound = () => {
  return (
    <div className="card bg-base-200 p-6 text-center">
      <div className="flex justify-center mb-3">
        <Film className="size-8 text-yellow-500 opacity-60" />
      </div>
      <h3 className="font-semibold text-lg mb-2">No movie friends yet</h3>
      <p className="text-base-content opacity-70">
        Connect with fellow movie lovers below to start sharing your favorite genres and films!
      </p>
    </div>
  );
};

export default NoFriendsFound;
