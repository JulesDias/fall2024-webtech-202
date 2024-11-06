//home page

import Link from 'next/link';

export default function Home() {
  return (
    
        <div className="text-center">
          <h1 className="wt-title-better">
            Welcome to the Blog
          </h1>
          <p className="mb-8 text-xl text-black-600">
            Discover amazing articles and stories.
          </p>
          
          <Link href="/articles/" >
            <button className="px-8 py-3 text-lg text-white transition duration-300 bg-black rounded-full hover:bg-gray-800">
              Explore Now
            </button>
          </Link>
          
        </div>
    
  );
}
