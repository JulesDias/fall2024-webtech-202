'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import Link from 'next/link';
import { useDarkMode } from '../../../components/DarkmodeContext';

export default function Article() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [author, setAuthor] = useState('');
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isDarkMode } = useDarkMode();

  const fetchArticleData = async () => {
    setLoading(true);
    try {
      // Fetch article details
      const { data: articleData, error: articleError } = await supabase
        .from('posts')
        .select('*, author:my_users(name)')
        .eq('id', articleId)
        .single();

      if (articleError) throw articleError;

      setArticle(articleData);
      setAuthor(articleData.author?.name || 'Unknown');

      // Fetch likes count
      const { count: likesCount, error: likesError } = await supabase
        .from('likes')
        .select('*', { count: 'exact' })
        .eq('post_id', articleId);

      if (likesError) throw likesError;

      setLikes(likesCount || 0);

      // Check if the user has liked the post
      const user = await supabase.auth.getUser();
      const { data: userLikes, error: userLikesError } = await supabase
        .from('likes')
        .select('id')
        .eq('post_id', articleId)
        .eq('user_id', user.data.user.id)
        .single();

      if (userLikesError && userLikesError.code !== 'PGRST116') throw userLikesError; // Ignore "no rows found" error
      setIsLiked(!!userLikes);
    } catch (err) {
      setError('Failed to fetch the article or likes.');
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async () => {
    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      alert('You need to be logged in to like this post.');
      return;
    }

    try {
      if (isLiked) {
        // Remove like
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('post_id', articleId)
          .eq('user_id', user.data.user.id);

        if (error) throw error;

        setIsLiked(false);
        setLikes((prev) => prev - 1);
      } else {
        // Add like
        const { error } = await supabase
          .from('likes')
          .insert({ post_id: articleId, user_id: user.data.user.id });

        if (error) throw error;

        setIsLiked(true);
        setLikes((prev) => prev + 1);
      }
    } catch (err) {
      console.error('Error toggling like:', err.message);
    }
  };

  useEffect(() => {
    if (articleId) {
      fetchArticleData();
    }
  }, [articleId]);

  const cardBackground = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = isDarkMode ? 'text-gray-200' : 'text-gray-900';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const secondaryTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const inputBackground = isDarkMode ? 'bg-gray-700' : 'bg-gray-100';
  const inputTextColor = isDarkMode ? 'text-gray-200' : 'text-gray-900';

  if (loading) {
    return <p className="mt-8 text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="mt-8 text-center text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col items-center h-screen pt-8 font-FS_Sinclair">
      {/* Article Zone */}
      <div className={`${cardBackground} ${borderColor} border rounded-xl shadow-2xl p-8 w-2/3 mb-8`}>
        <h1 className={`text-3xl font-extrabold ${textColor} mb-6`}>{article.title}</h1>
        <p className={`${secondaryTextColor} text-lg leading-relaxed mb-4`}>{article.content}</p>
        <p className={`${secondaryTextColor} text-sm mb-4`}>By: {author}</p>
        <div className="flex items-center justify-between mb-4">
          <button 
            className={`text-2xl ${isLiked ? 'text-red-500' : secondaryTextColor}`} 
            onClick={toggleLike}
          >
            {isLiked ? '❤️' : '🤍'} {likes} Likes
          </button>
          <Link href="/articles" className="font-semibold text-blue-600 hover:text-blue-800">
            Back to articles
          </Link>
        </div>
      </div>

      {/* Comment Zone */}
      <div className={`${cardBackground} ${borderColor} border rounded-xl shadow-2xl p-8 w-2/3`}>
        <textarea 
          className={`w-full p-4 ${inputBackground} ${inputTextColor} ${borderColor} rounded-lg focus:outline-none focus:ring ${isDarkMode ? 'focus:ring-blue-700' : 'focus:ring-blue-300'}`} 
          placeholder="Write a comment..."
        />
        <button className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          Submit Comment
        </button>
      </div>
    </div>
  );
}
