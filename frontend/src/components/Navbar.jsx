import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/30 shadow-md">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left Section: Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center transition-all group-hover:scale-105">
            <MessageSquare className="w-6 h-6 text-primary transition-all group-hover:text-blue-500" />
          </div>
          <h1 className="text-xl font-extrabold text-gray-800 transition-all group-hover:text-blue-600">
            PingMe
          </h1>
        </Link>

        {/* Right Section: Buttons */}
        <div className="flex items-center gap-4">
          <Link
            to={"/settings"}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-all hover:scale-105"
          >
            <Settings className="w-5 h-5" />
            <span className="hidden sm:inline font-medium">Settings</span>
          </Link>

          {authUser && (
            <>
              <Link
                to={"/profile"}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-all hover:scale-105"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline font-medium">Profile</span>
              </Link>

              <button
                className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-all hover:scale-105"
                onClick={logout}
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline font-medium">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

