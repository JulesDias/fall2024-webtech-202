// src/pages/_app.js

import '../styles/globals.css'; // Import the global Tailwind CSS styles

function MyApp({ Component, pageProps }) {
  // `Component` refers to the active page, `pageProps` are the props of the page
  return <Component {...pageProps} />;
}

export default MyApp;
