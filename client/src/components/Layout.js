import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-100 to-black">{children}</main>
      <Footer />
    </div>
  );
}