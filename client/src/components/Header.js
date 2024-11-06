import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-100 shadow-md">
      <nav className="container flex items-center justify-between p-4 mx-auto">
        <div className="text-xl font-semibold text-gray-900">SaxoJazz.blog2000@caramail.fr</div>
        <div className="space-x-6">
          <Link href="/" className="text-gray-700 transition hover:text-black">
            Home
          </Link>
          <Link href="/about" className="text-gray-700 transition hover:text-black">
            About
          </Link>
          <Link href="/contacts" className="text-gray-700 transition hover:text-black">
            Contacts
          </Link>
          <Link href="/articles" className="text-gray-700 transition hover:text-black">
            Articles
          </Link>
        </div>
      </nav>
    </header>
  );
}
