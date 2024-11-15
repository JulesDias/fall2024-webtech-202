// Articles page
import Link from 'next/link';
import Globe3D from '../../components/Globe3D';

export default function Articles() {
  const articles = [
    { id: 1, title: 'First Article' },
    { id: 2, title: 'Second Article' },
  ];

  return (
    <div className="grid w-full h-full min-h-screen grid-cols-3 grid-rows-4 gap-4 p-4">
      {/* Title in the top-left corner */}
      <div className="flex items-center justify-center col-span-1 row-start-1">
        <h1 className="text-3xl font-bold">Articles</h1>
      </div>

      {/* Search bar at the top-right */}
      <div className="flex items-center justify-end col-span-2 row-start-1">
        <input
          type="text"
          placeholder="Search articles..."
          className="w-2/3 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Article links in the middle-center-right */}
      <div className="flex justify-end col-span-2 col-start-2 row-span-2 row-start-2 pr-8">
        <ul className="w-1/2 space-y-4">
          {articles.map((article) => (
            <li
              key={article.id}
              className="p-2 text-sm transition bg-gray-100 rounded-lg shadow hover:shadow-lg"
            >
              <Link
                href={`/articles/${article.id}`}
                className="text-base text-black hover:text-blue-500"
              >
                {article.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Optional Globe3D element */}
      <div className="absolute w-[50vw] h-[50vh] overflow-hidden" style={{ right: '55%', top: '45%' }}>
        <Globe3D />
      </div>
    </div>
  );
}
