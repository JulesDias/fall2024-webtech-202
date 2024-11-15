// Articles page
import Link from 'next/link';
import Globe3D from '../../components/Globe3D';

export default function Articles() {
  const articles = [
    { id: 1, title: 'First Article' },
    { id: 2, title: 'Second Article' },
  ];

  return (
    <div className="grid grid-cols-3 grid-rows-[auto_1fr] gap-4 h-screen p-4">
      {/* Set the position and size explicitly */}
      <div className="absolute w-[50vw] h-[50vh]" style={{ left: "5%", bottom: "5%" }}>
        <Globe3D />
      </div>

      <h1 className="text-3xl font-bold col-span-1 row-start-1">Articles</h1>
      <div className="col-span-2 row-start-1 flex justify-end">
        <input
          type="text"
          placeholder="Search articles..."
          className="px-4 py-2 border rounded-md"
        />
      </div>
      <ul className="space-y-4 col-span-2 col-start-2 row-start-2">
        {articles.map((article) => (
          <li key={article.id} className="p-4 bg-white rounded-lg shadow hover:shadow-lg">
            <Link href={`/articles/${article.id}`} className="text-lg text-black hover:text-blue-500">
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
