// components/DarkModeContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load the theme preference from localStorage when the component mounts
  useEffect(() => {
    const storedPreference = localStorage.getItem('isDarkMode');
    if (storedPreference !== null) {
      setIsDarkMode(JSON.parse(storedPreference)); // Parse stored string to boolean
    }
  }, []);

  // Toggle dark mode and persist the new value in localStorage
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('isDarkMode', JSON.stringify(newMode)); // Save as string
      return newMode;
    });
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  return useContext(DarkModeContext);
}
