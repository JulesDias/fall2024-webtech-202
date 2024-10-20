// Article detail page
import { useRouter } from 'next/router';
import Link from 'next/link'; // Ajoute cette ligne pour importer Link
import Layout from '../../components/Layout';

export default function Article() {
  const router = useRouter();
  const { articleId } = router.query;

  return (
    <Layout>

        <div className="max-w-2xl">
          <h1 className="wt-title-better">
            Article ID: {articleId}
          </h1>
          <p className="text-lg text-gray-600 mb-8 font-roboto">
            This is a detailed view of the article with ID: {articleId}. Here you can add more content related to the article.
          </p>
          <Link href="/articles" className="text-blue-500 hover:underline font-roboto">
            Back to Articles
          </Link>
        </div>

    </Layout>
  );
}
