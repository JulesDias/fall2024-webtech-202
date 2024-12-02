"use client";

import { usePathname } from 'next/navigation';
import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';
import { UserProvider } from "../components/UserContext";
import { DarkModeProvider, useDarkMode } from '../components/DarkmodeContext';

export default function RootLayout({ children }) {


  return (
    <DarkModeProvider>
      <DarkModeLayout>{children}</DarkModeLayout>
    </DarkModeProvider>
  );
}


function DarkModeLayout({ children }) {
  const { isDarkMode } = useDarkMode(); // Access dark mode state
  const pathname = usePathname();
  let isParallaxPage = (pathname === '/' || pathname === '/about') ? true : false;


  return (
    <html className={isDarkMode ? 'dark' : ''}>
      <body className={isParallaxPage ? 'overflow-hidden' : ''}>
        <UserProvider>

          <div className="flex flex-col min-h-screen">
            <Header />
            <main className={isParallaxPage ? 'flex-grow bg-gradient-to-b from-gray-100 to-gray-400 dark:from-gray-900 dark:to-gray-700 '
              : 'flex items-center justify-center h-screen bg-gradient-to-b from-gray-100 to-gray-400 dark:from-gray-900 dark:to-gray-700'}>
              {children}
            </main>
            <Footer />
          </div>

        </UserProvider>
      </body>
    </html>
  );
}