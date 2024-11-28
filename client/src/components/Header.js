"use client";

import Link from "next/link";
import { useUser } from "./UserContext";
import SwitchDM from "./ui/SwitchDM";
import { useDarkMode } from "./DarkmodeContext";
import NewsTicker from "../components/ui/NewsTicker";

export default function Header() {
  const { user, logout } = useUser(); // Utilisation du UserContext
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="sticky top-0 z-10 bg-gray-100 shadow-md dark:bg-gray-800 font-FS_Sinclair">
      <nav className="flex items-center justify-between w-full p-4">
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
        <div className="flex-1 max-w-prose mx-auto">
          <NewsTicker />
        </div>

        <div className="flex items-center space-x-6">
          {/* Toggle dark mode */}
          <SwitchDM checked={isDarkMode} onChange={toggleDarkMode} />

          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 dark:text-gray-300">Welcome, {user.name}</span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 text-white rounded-md transition hover:bg-red-700 dark:bg-red-500"
              >
                Logout
              </button>
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
  );
}
