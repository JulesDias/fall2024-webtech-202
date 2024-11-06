// Articles page
import Link from 'next/link';



export default function Articles() {
  const articles = [
    { id: 1, title: 'First Article' },
    { id: 2, title: 'Second Article' },
  ];

  return (
        <div className="max-w-2xl">
          <h1 className="wt-title-better">
            Articles
          </h1>
          <ul className="space-y-4">
            {articles.map((article) => (
              <li key={article.id} className="p-4 transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg">
                <Link href={`/articles/${article.id}`} className="text-lg text-black transition font-roboto hover:text-blue-500">
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
  );
}
