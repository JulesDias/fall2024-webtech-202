"use client"; // Indique que ce fichier est un composant client

import Link from 'next/link';

export default function Header({ isDarkMode, toggleDarkMode }) {
  return (
    <header className="sticky top-0 z-10 bg-gray-100 shadow-md dark:bg-gray-800">
      <nav className="container flex items-center justify-between p-4 mx-auto">
       {/* Login Button */}
       <div className="flex space-x-4">
          <Link href="/login_native" className="px-4 py-2 bg-gray-800 text-white rounded-md transition hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500">
            Login
          </Link>
          <Link href="/login_controlled" className="px-4 py-2 bg-gray-800 text-white rounded-md transition hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500">
            Signup
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          <Link href="/" className="text-gray-700 transition hover:text-black dark:text-gray-300 dark:hover:text-white">
            Home
          </Link>
          <Link href="/about" className="text-gray-700 transition hover:text-black dark:text-gray-300 dark:hover:text-white">
            About
          </Link>
          <Link href="/contacts" className="text-gray-700 transition hover:text-black dark:text-gray-300 dark:hover:text-white">
            Contacts
          </Link>
          <Link href="/articles" className="text-gray-700 transition hover:text-black dark:text-gray-300 dark:hover:text-white">
            Articles
          </Link>
          {/* Toggle Switch */}
          <button onClick={toggleDarkMode} className="p-2 bg-gray-200 rounded hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-400">
            {isDarkMode ? '🌙' : '☀️'}
          </button>
        </div>
      </nav>
    </header>
  );
}
