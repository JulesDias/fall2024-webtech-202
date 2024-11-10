"use client"; //indique que ce fichier est un composant client

import '../styles/globals.css'; // Import the global Tailwind CSS styles
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';
import { UserProvider } from "../components/UserContext";




export default function RootLayout({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <html className={isDarkMode ? 'dark' : ''}>
      <body>
        <UserProvider>
          <div className="flex flex-col min-h-screen">
            <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            <main className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-100 to-gray-400 dark:from-gray-900 dark:to-gray-700">
              {children}
            </main>
            <Footer />
          </div>
        </UserProvider>
      </body>
    </html>
  );
}