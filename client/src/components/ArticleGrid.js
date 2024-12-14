'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import ArticleCard from './ArticleCard';

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const articlesPerPage = 9;

  const fetchArticles = async (page) => {
    setLoading(true);
    try {
      const start = (page - 1) * articlesPerPage;
      const end = start + articlesPerPage - 1;

      const { data, error, count } = await supabase
        .from('posts')
        .select(
          `
          id, 
          title,
          author_id,
          my_users(name),
          created_at,
          likes:likes(count)
        `,
          { count: 'exact' }
        )
        .order('created_at', { ascending: false })
        .range(start, end);

      if (error) throw error;

      const formattedData = data.map((article) => ({
        id: article.id,
        title: article.title,
        author: article.my_users?.name || 'Unknown',
        likes: article.likes[0]?.count || 0,
      }));

      setArticles(formattedData);
      setTotalArticles(count);
    } catch (err) {
      setError('Failed to fetch articles.');
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalArticles / articlesPerPage);

  return (
    <div className="p-8">
      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-lg text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
