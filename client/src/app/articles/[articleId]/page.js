// Article detail page
'use client'
import { useParams } from 'next/navigation';
import Link from 'next/link'; // Ajoute cette ligne pour importer Link


export default function Article() {
  const {articleId } = useParams();

  return (
    

        <div className="max-w-2xl">
          <h1 className="wt-title-better">
            Article ID: {articleId}
          </h1>
          <p className="mb-8 text-lg text-gray-600 font-roboto">
            This is a detailed view of the article with ID: {articleId}. Here you can add more content related to the article.
          </p>
          <Link href="/articles" className="text-blue-500 hover:underline font-roboto">
            Back to Articles
          </Link>
        </div>

   
  );
}
