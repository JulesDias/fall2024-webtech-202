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

  const [menuOpen, setMenuOpen] = useState(false); // Contrôle du menu profil
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Contrôle du menu mobile
  const [showNewsTicker, setShowNewsTicker] = useState(true); // Contrôle de la visibilité du NewsTicker

  // Ouvre/ferme le dropdown du menu profil
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  // Ouvre/ferme le menu mobile (hamburger)
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Déconnexion utilisateur
  const handleLogout = () => {
    setMenuOpen(false); // Fermer le menu profil
    logout();
  };

  const userProfilePic = user?.avatar_url || "/BasicImage.png"; // Image par défaut

  return (
    <>
      <header className="sticky top-0 z-20 bg-gray-100 shadow-md dark:bg-gray-800 font-FS_Sinclair">
        <nav className="flex items-center justify-between w-full p-4">
          {/* Menu hamburger - affiché uniquement en mobile */}
          <div className="flex items-center space-x-4 sm:hidden">
            {/* Bouton hamburger */}
            <button
              type="button"
              className="p-2 text-gray-700 rounded-md dark:text-gray-200 hover:text-black dark:hover:text-white focus:outline-none"
              onClick={handleMobileMenuToggle}
            >
              {mobileMenuOpen ? (
                // Icône "X" pour fermer
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Icône hamburger
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Links (version desktop) - masqués sur mobile */}
          <div className="hidden sm:flex space-x-4">
            <Link
              href="/"
              className="px-4 py-2 text-gray-700 transition hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              Home
            </Link>
            <Link
              href="/articles"
              className="px-4 py-2 text-gray-700 transition hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              Articles
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 text-gray-700 transition hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              About
            </Link>
            <Link
              href="/contacts"
              className="px-4 py-2 text-gray-700 transition hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              Contacts
            </Link>
            <Link
              href="/train"
              className="px-4 py-2 text-gray-700 transition hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              Training
            </Link>
          </div>

          {/* Right side (Darkmode + News toggle + Profile/Login) - version desktop */}
          <div className="hidden sm:flex items-center space-x-6">
            {/* Toggle dark mode */}
            <SwitchDM checked={isDarkMode} onChange={toggleDarkMode} />

            <div className="flex items-center space-x-2">
              <span>Show News</span>
              <input
                type="checkbox"
                checked={showNewsTicker}
                onChange={() => setShowNewsTicker(!showNewsTicker)}
                className="w-5 h-5 rounded-full text-blue-600 dark:bg-gray-600 focus:ring-blue-500"
              />
            </div>

            {/* Profile / Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={handleMenuToggle}
                  className="relative w-10 h-10 overflow-hidden rounded-full ring-2 ring-gray-300 dark:ring-gray-600"
                >
                  <img
                    src={userProfilePic}
                    alt="User Profile"
                    className="object-cover w-full h-full"
                  />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 w-48 mt-2 bg-white border rounded-lg shadow-lg z-20 dark:bg-gray-700 dark:border-gray-600 max-w-xs">
                    <div className="block px-4 py-2 text-gray-700 dark:text-gray-300 truncate">
                      {user.name}
                    </div>
                    <hr className="border-gray-300 dark:border-gray-600" />
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                      Account
                    </Link>
                    <hr className="border-gray-300 dark:border-gray-600" />
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
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

        {/* Menu Mobile (affiché uniquement si le hamburger est ouvert) */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            {/* Links version mobile */}
            <div className="flex flex-col space-y-2 px-4 py-4">
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/articles"
                className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Articles
              </Link>
              <Link
                href="/about"
                className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contacts"
                className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contacts
              </Link>
              <Link
                href="/train"
                className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Training
              </Link>
            </div>

            {/* Dark mode / News Toggle / Profile (ou login) en mode mobile */}
            <div className="flex flex-col space-y-2 px-4 pb-4">
              <div className="flex items-center space-x-2">
                <SwitchDM checked={isDarkMode} onChange={toggleDarkMode} />
                <span>Dark Mode</span>
              </div>

              <div className="flex items-center space-x-2">
                <span>Show News</span>
                <input
                  type="checkbox"
                  checked={showNewsTicker}
                  onChange={() => setShowNewsTicker(!showNewsTicker)}
                  className="w-5 h-5 rounded-full text-blue-600 dark:bg-gray-600 focus:ring-blue-500"
                />
              </div>

              {/* Profile / Login (mobile) */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={handleMenuToggle}
                    className="relative w-10 h-10 overflow-hidden rounded-full ring-2 ring-gray-300 dark:ring-gray-600"
                  >
                    <img
                      src={userProfilePic}
                      alt="User Profile"
                      className="object-cover w-full h-full"
                    />
                  </button>
                  {menuOpen && (
                    <div className="absolute right-0 w-48 mt-2 bg-white border rounded-lg shadow-lg z-20 dark:bg-gray-700 dark:border-gray-600 max-w-xs">
                      <div className="block px-4 py-2 text-gray-700 dark:text-gray-300 truncate">
                        {user.name}
                      </div>
                      <hr className="border-gray-300 dark:border-gray-600" />
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Account
                      </Link>
                      <hr className="border-gray-300 dark:border-gray-600" />
                      <Link
                        href="/settings"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Settings
                      </Link>
                      <hr className="border-gray-300 dark:border-gray-600" />
                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-left rounded-lg text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-600"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link
                    href="/login_native"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md transition hover:bg-blue-700 dark:bg-blue-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/login_controlled"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md transition hover:bg-blue-700 dark:bg-blue-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bandeau d'information */}
        {showNewsTicker && (
          <div
            className="w-full bg-cover bg-center text-center text-white py-0"
            style={{ backgroundImage: "url('/HdBackgroundNewsTicker.png')" }}
          >
            <NewsTicker />
          </div>
        )}
      </header>
    </>
  );
}
