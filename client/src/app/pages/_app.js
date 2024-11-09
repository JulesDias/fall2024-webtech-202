// src/pages/_app.js
import { UserProvider } from '../components/UserContext'; // Assurez-vous que le chemin est correct
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
