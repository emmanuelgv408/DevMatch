import { useState } from "react";
import { Link } from "react-router-dom";
import chatIcon from "../assets/chat-icon.svg";
import friendsIcon from "../assets/friends-icon.svg";
import notificationsIcon from "../assets/notifications.svg";
import searchIcon from "../assets/search-icon.svg";
import profileIcon from "../assets/profile-icon.svg";

const Navbar = () => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const currentUserId = JSON.parse(localStorage.getItem("user") || "{}")._id;

  const navLinks = [
    { to: "/friends", icon: friendsIcon, label: "Friends" },
    { to: "/chat", icon: chatIcon, label: "Chat" },
    { to: "/notifications", icon: notificationsIcon, label: "Notifications" },
    { to: `/profile/${currentUserId}`, icon: profileIcon, label: "Profile"}
  ];

  return (
    <nav className="w-full  bg-gray-900">
      <div className="mx-auto flex max-w-7xl items-center px-4 py-3">
        {/* Logo */}
        <Link
          to="/feed"
          className="text-xl font-bold text-blue-600 md:text-2xl flex-shrink-0"
        >
          <span className="text-white">Dev</span>Match
        </Link>

        {/* Right side */}
        <div className="flex-1 flex items-center justify-between ml-4">
          {/* Mobile search overlay */}
          {mobileSearchOpen ? (
            <div className="flex-1 flex flex-col md:hidden">
              <div className="flex items-center w-full">
                <img
                  src={searchIcon}
                  alt="Search"
                  className="w-6 h-6 brightness-0 invert mr-2"
                />
                <input
                  type="text"
                  placeholder="Search..."
                  autoFocus
                  className="flex-1 py-2 px-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => setMobileSearchOpen(false)}
                  className="ml-2 text-white text-xl font-bold"
                >
                  ✕
                </button>
              </div>
              {/* Label removed when search is open */}
            </div>
          ) : (
            <>
              {/* Mobile search icon */}
              <div
                className="flex flex-col items-center md:hidden mr-4 cursor-pointer"
                onClick={() => setMobileSearchOpen(true)}
              >
                <img
                  src={searchIcon}
                  alt="Search"
                  className="w-6 h-6 brightness-0 invert"
                />
                <span className="text-xs text-gray-300 mt-1">Search</span>
              </div>

              {/* Desktop search input */}
              <div className="hidden md:block relative flex-1 mr-6">
                <img
                  src={searchIcon}
                  alt="Search"
                  className="w-6 h-6 absolute left-2 top-1/2 -translate-y-1/2 brightness-0 invert"
                />
                <input
                  type="text"
                  placeholder="I'm looking for..."
                  className="pl-10 pr-3 py-1 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>

              {/* Other nav links spread evenly */}
              <div className="flex flex-1 justify-around">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex flex-col items-center text-gray-200 hover:text-blue-500 transition cursor-pointer"
                  >
                    <img
                      src={link.icon}
                      alt={link.label}
                      className="w-6 h-6 sm:w-7 sm:h-7 brightness-0 invert"
                    />
                    <span className="text-xs sm:text-sm mt-1">{link.label}</span>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
