// Articles page
import Link from 'next/link';
import Layout from '../../components/Layout';

export default function Articles() {
  const articles = [
    { id: 1, title: 'First Article' },
    { id: 2, title: 'Second Article' },
  ];

  return (
    <Layout>
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-100 to-black text-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight font-roboto">
            Articles
          </h1>
          <ul className="space-y-4">
            {articles.map((article) => (
              <li key={article.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                <Link href={`/articles/${article.id}`} className="text-lg text-black font-roboto hover:text-blue-500 transition">
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
