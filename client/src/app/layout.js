"use client";

import { usePathname } from 'next/navigation';
import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';
import { UserProvider } from "../components/UserContext";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const isLandingPage = pathname === '/';

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <html className={isDarkMode ? 'dark' : ''}>
      <body className={isLandingPage ? 'overflow-hidden' : ''}>
      <UserProvider>
          <div className="flex flex-col min-h-screen">
            <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />  {/* Pass to Header */}
            
            <main className={isLandingPage ? 'flex-grow bg-gradient-to-b from-gray-100 to-gray-400 dark:from-gray-900 dark:to-gray-700 ' : 'flex items-center justify-center h-screen bg-gradient-to-b from-gray-100 to-gray-400 dark:from-gray-900 dark:to-gray-700'}>
              {children}
            </main>


            <Footer />
          </div>
          </UserProvider>
      </body>
    </html>
  );
}

