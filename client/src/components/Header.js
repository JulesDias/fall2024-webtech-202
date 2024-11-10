// app/components/Header.js
"use client";

import Link from "next/link";
import { useUser } from "./UserContext";

export default function Header({ isDarkMode, toggleDarkMode }) {
  const { user, login, logout } = useUser();

  const handleLogin = () => {
    const username = prompt("Enter your username:");
    if (username) login(username);
  };

  return (
    <header className="sticky top-0 z-10 bg-gray-100 shadow-md dark:bg-gray-800">
      <nav className="container flex items-center justify-between p-4 mx-auto">
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

        <div className="flex items-center space-x-6">
          <button onClick={toggleDarkMode} className="p-2 bg-gray-200 rounded hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-400">
            {isDarkMode ? "🌙" : "☀️"}
          </button>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 dark:text-gray-300">Welcome, {user.username}</span>
              <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded-md transition hover:bg-red-700 dark:bg-red-500">
                Logout
              </button>
            </div>
          ) : (
            <button onClick={handleLogin} className="px-4 py-2 bg-blue-600 text-white rounded-md transition hover:bg-blue-700 dark:bg-blue-500">
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
