"use client";

import { usePathname } from 'next/navigation';
import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
  const { isDarkMode } = useDarkMode();
  const pathname = usePathname();
  const isParallaxPage = pathname === '/' || pathname === '/about';

  return (
    <html className={isDarkMode ? 'dark' : ''}>
      <body>
        <UserProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main
              className={`flex-grow bg-gradient-to-b from-gray-100 to-gray-400 dark:from-gray-900 dark:to-gray-700 ${isParallaxPage ? 'overflow-hidden' : 'overflow-y-auto'
                }`}
            >
              {children}
            </main>
            <Footer />
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
