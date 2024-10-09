import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

export default function Article() {
  const router = useRouter();
  const { articleId } = router.query;

  return (
    <Layout>
      <h1>Article ID: {articleId}</h1>
      <p>This is a detailed view of the article with ID: {articleId}.</p>
    </Layout>
  );
}
