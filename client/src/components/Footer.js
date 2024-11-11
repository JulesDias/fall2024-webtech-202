import { DarkModeProvider, useDarkMode  } from '../components/DarkmodeContext';

export default function Footer() {

  const { isDarkMode } = useDarkMode();  // Access dark mode value from context
  
  return (
    <footer className="p-6 text-center bg-gray-400 text-white dark:bg-gray-700 dark:text-gray-400" >
      <p className="text-sm">© 2024 Democratic Liberty Hub - All Rights Reserved</p>
    </footer>
  );
}
