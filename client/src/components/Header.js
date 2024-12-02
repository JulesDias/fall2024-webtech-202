"use client";

import Link from "next/link";
import { useState } from "react";
import { useUser } from "./UserContext";
import SwitchDM from "./ui/SwitchDM";
import { useDarkMode } from "./DarkmodeContext";
import NewsTicker from "../components/ui/NewsTicker";

export default function Header() {
  const { user, logout } = useUser(); // Utilisation du UserContext
  const { isDarkMode, toggleDarkMode } = useDarkMode(); // Utilisation du DarkmodeContext
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNewsTicker, setShowNewsTicker] = useState(true); // Control visibility of NewsTicker

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    setMenuOpen(false); // Close the menu
    logout();
  };

  const userProfilePic = user?.avatar_url || "/BasicImage.png"; // Image par défaut si l'utilisateur n'a pas de photo de profil

  return (
    <>
      <header className="sticky top-0 z-10 bg-gray-100 shadow-md dark:bg-gray-800 font-FS_Sinclair">
        <nav className="flex items-center justify-between w-full p-4">
          {/* Navigation Links */}
          <div className="flex space-x-4">
            <Link href="/" className="px-4 py-2 text-gray-700 transition hover:text-black dark:text-gray-300 dark:hover:text-white">
              Home
            </Link>
            <Link href="/about" className="px-4 py-2 text-gray-700 transition hover:text-black dark:text-gray-300 dark:hover:text-white">
              About
            </Link>
            <Link href="/contacts" className="px-4 py-2 text-gray-700 transition hover:text-black dark:text-gray-300 dark:hover:text-white">
              Contacts
            </Link>
            <Link href="/articles" className="px-4 py-2 text-gray-700 transition hover:text-black dark:text-gray-300 dark:hover:text-white">
              Articles
            </Link>
          </div>

          {/* Right Side: Dark Mode Toggle & Profile */}
          <div className="flex items-center space-x-6">
            {/* Toggle dark mode */}
            <SwitchDM checked={isDarkMode} onChange={toggleDarkMode} />

            <span>Show News</span>
            <input
              type="checkbox"
              checked={showNewsTicker}
              onChange={() => setShowNewsTicker(!showNewsTicker)}
              className="w-5 h-5 rounded-full text-blue-600 dark:bg-gray-600 focus:ring-blue-500"
            />

            {user ? (
              <div className="relative">
                {/* User profile picture */}
                <button onClick={handleMenuToggle} className="relative w-10 h-10 overflow-hidden rounded-full ring-2 ring-gray-300 dark:ring-gray-600">
                  <img src={userProfilePic} alt="User Profile" className="object-cover w-full h-full" />
                </button>

                {/* Dropdown Menu */}
                {menuOpen && (
                  <div className="absolute right-0 w-48 mt-2 bg-white border rounded-lg shadow-lg z-auto dark:bg-gray-700 dark:border-gray-600">
                    <div className="block px-4 py-2 text-gray-700 dark:text-gray-300">
                      {user.name} {/* Affiche le nom de l'utilisateur */}
                    </div>
                    <hr className="border-gray-300 dark:border-gray-600" />
                    <Link href="/account" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">
                      Account
                    </Link>
                    <hr className="border-gray-300 dark:border-gray-600" />
                    <Link href="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">
                      Settings
                    </Link>
                    <hr className="border-gray-300 dark:border-gray-600" />
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left rounded-lg text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}

              </div>
            ) : (
              <>
                <Link
                  href="/login_native"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md transition hover:bg-blue-700 dark:bg-blue-500"
                >
                  Login
                </Link>
                <Link
                  href="/login_controlled"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md transition hover:bg-blue-700 dark:bg-blue-500"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {showNewsTicker && (
        <div
          className="sticky top-[4rem] w-full bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/HdBackgroundNewsTicker.png')" }}
        >
          <div className="py-0 shadow-md dark:shadow-lg">
            <NewsTicker />
          </div>
        </div>
      )}

    </>
  );
}
