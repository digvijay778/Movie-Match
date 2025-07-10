import { Link, useLocation } from "react-router-dom"; // Corrected import to react-router-dom
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, UsersIcon, Film, MessageSquareQuote } from "lucide-react"; // Added MessageSquareQuote icon

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
      {/* Logo / Branding */}
      <div className="p-5 border-b border-base-300">
        <Link to="/" className="flex items-center gap-2.5">
          <Film className="size-9 text-yellow-500 animate-pulse" />
          <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500 tracking-wider">
            MovieMatch
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <Link
          to="/"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/" ? "btn-active" : ""
          }`}
        >
          <HomeIcon className="size-5 text-base-content opacity-70" />
          <span>Home</span>
        </Link>

        <Link
          to="/friends"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/friends" ? "btn-active" : ""
          }`}
        >
          <UsersIcon className="size-5 text-base-content opacity-70" />
          <span>Friends</span>
        </Link>
        
        {/* ======================================= */}
        {/* =============== NEW LINK ============== */}
        {/* ======================================= */}
        <Link
          to="/reviews"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/reviews" ? "btn-active" : ""
          }`}
        >
          <MessageSquareQuote className="size-5 text-base-content opacity-70" />
          <span>Movie Reviews</span>
        </Link>

        <Link
          to="/notifications"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/notifications" ? "btn-active" : ""
          }`}
        >
          <BellIcon className="size-5 text-base-content opacity-70" />
          <span>Notifications</span>
        </Link>
      </nav>

      {/* ============================================= */}
      {/* =============== UPDATED PROFILE SECTION =============== */}
      {/* ============================================= */}
      <div className="p-4 border-t border-base-300 mt-auto">
        <Link to={`/profile/${authUser?._id}`} className="flex items-center gap-3 group transition-opacity duration-300 hover:opacity-80">
          <div className="avatar">
            <div className="w-10 rounded-full ring-primary group-hover:ring-2">
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm group-hover:underline">{authUser?.fullName}</p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-2 rounded-full bg-success inline-block" />
              Online
            </p>
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
