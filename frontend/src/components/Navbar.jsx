import { Link, useLocation } from "react-router-dom"; // Corrected import to react-router-dom
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, Film } from "lucide-react"; // Removed unused Popcorn icon
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          {/* LOGO - ONLY IN THE CHAT PAGE */}
          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                <Film className="size-9 text-yellow-500 animate-pulse" />
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500 tracking-wider">
                  MovieMatch
                </span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle" aria-label="Notifications">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>
          </div>

          <ThemeSelector />
          
          {/* ============================================= */}
          {/* =============== UPDATED AVATAR LINK =============== */}
          {/* ============================================= */}
          <Link 
            to={`/profile/${authUser?._id}`} 
            className="avatar ml-2 group"
            aria-label="View Profile"
          >
            <div className="w-9 rounded-full ring-primary ring-offset-base-200 ring-offset-2 transition-all group-hover:ring-4">
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </Link>

          <button className="btn btn-ghost btn-circle" onClick={logoutMutation} aria-label="Logout">
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
