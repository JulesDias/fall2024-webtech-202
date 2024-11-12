// Header.js
"use client";

import Link from "next/link";
import { useUser } from "./UserContext";
import SwitchDM from "./SwitchDM";
import { useDarkMode } from "./DarkmodeContext"; // Import the context hook
import { usePathname } from 'next/navigation';

export default function Header() {
  const { user, login, logout } = useUser();
  const { isDarkMode, toggleDarkMode } = useDarkMode(); // Access dark mode context

  const pathname = usePathname();

  const handleLogin = () => {
    const username = prompt("Enter your username:");
    if (username) login(username);
  };

  return (
    <header className="sticky top-0 z-10 bg-gray-100 shadow-md dark:bg-gray-800 font-FS_Sinclair">
      <nav className="container flex items-center justify-between p-4 mx-auto">
        <div className="flex space-x-4">
          <Link href="/" className={`px-4 py-2 transition hover:text-black dark:hover:text-white ${
            pathname === '/' ? 'text-black dark:text-white border-b-2 border-black dark:border-gray-200' : 'text-gray-700 dark:text-gray-300'
          }`}>
            Home
          </Link>
          <Link href="/about" className={`px-4 py-2 transition hover:text-black dark:hover:text-white ${
            pathname === '/about' ? 'text-black dark:text-white border-b-2 border-black dark:border-gray-200' : 'text-gray-700 dark:text-gray-300'
          }`}>
            About
          </Link>
          <Link href="/contacts" className={`px-4 py-2 transition hover:text-black dark:hover:text-white ${
            pathname === '/contacts' ? 'text-black dark:text-white border-b-2 border-black dark:border-gray-200' : 'text-gray-700 dark:text-gray-300'
          }`}>
            Contacts
          </Link>
          <Link href="/articles" className={`px-4 py-2 transition hover:text-black dark:hover:text-white ${
            pathname === '/articles' ? 'text-black dark:text-white border-b-2 border-black dark:border-gray-200' : 'text-gray-700 dark:text-gray-300'
          }`}>
            Articles
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          {/* Toggle dark mode using context */}
          <SwitchDM checked={isDarkMode} onChange={toggleDarkMode} />

          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 dark:text-gray-300">Welcome, {user.username}</span>
              <button onClick={logout} className="px-4 py-2 text-white transition bg-red-600 rounded-md hover:bg-red-700 dark:bg-red-500">
                Logout
              </button>
            </div>
          ) : (
            <button onClick={handleLogin} className="px-4 py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-500">
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
