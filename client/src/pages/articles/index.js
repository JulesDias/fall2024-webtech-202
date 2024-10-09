import Link from 'next/link';
import Layout from '../../components/Layout';

export default function Articles() {
  const articles = [
    { id: 1, title: 'First Article' },
    { id: 2, title: 'Second Article' },
  ];

  return (
    <Layout>
      <h1>Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <Link href={`/articles/${article.id}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
