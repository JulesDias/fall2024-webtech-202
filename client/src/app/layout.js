import '../styles/globals.css'; // Import the global Tailwind CSS styles
import Header from '../components/Header';
import Footer from '../components/Footer';



  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>
        <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-100 to-black">{children}</main>
      <Footer />
    </div>
        </body>
      </html>
    )
  }