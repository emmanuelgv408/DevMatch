import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full border-b ">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-blue-600 md:text-2xl"
        >
          <span className="text-white">Dev</span>Match
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-3 sm:gap-5 text-sm sm:text-base">
          <Link
            to="/feed"
            className="font-medium text-gray-700 hover:text-blue-600"
          >
            Feed
          </Link>

          <Link
            to="/friends"
            className="font-medium text-gray-700 hover:text-blue-600"
          >
            Friends
          </Link>

          <Link
            to="/chat"
            className="font-medium text-gray-700 hover:text-blue-600"
          >
            Chat
          </Link>

          <Link
            to="/notifications"
            className="font-medium text-gray-700 hover:text-blue-600"
          >
            Notifications
          </Link>

          <Link
            to="/profile"
            className="font-medium text-gray-700 hover:text-blue-600"
          >
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
