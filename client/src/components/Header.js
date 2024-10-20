import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-100 shadow-md">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <div className="text-xl font-semibold text-gray-900">SaxoJazz.blog2000@caramail.fr</div>
        <div className="space-x-6">
          <Link href="/" className="text-gray-700 hover:text-black transition">
            Home
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-black transition">
            About
          </Link>
          <Link href="/contacts" className="text-gray-700 hover:text-black transition">
            Contacts
          </Link>
          <Link href="/articles" className="text-gray-700 hover:text-black transition">
            Articles
          </Link>
        </div>
      </nav>
    </header>
  );
}
