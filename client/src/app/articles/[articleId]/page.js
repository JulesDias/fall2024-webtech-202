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
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
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

      // Fetch the logged-in user
      const { data: userData } = await supabase.auth.getUser();
      setUser(userData?.user || null);

      if (userData?.user) {
        // Check if the user has liked the post
        const { data: userLikes, error: userLikesError } = await supabase
          .from('likes')
          .select('id')
          .eq('post_id', articleId)
          .eq('user_id', userData.user.id)
          .single();

        if (userLikesError && userLikesError.code !== 'PGRST116') throw userLikesError; // Ignore "no rows found" error
        setIsLiked(!!userLikes);
      }

      // Fetch comments
      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select('content, created_at, user:my_users(name)')
        .eq('post_id', articleId)
        .order('created_at', { ascending: false });

      if (commentsError) throw commentsError;
      setComments(commentsData || []);
    } catch (err) {
      setError('Failed to fetch the article or likes.');
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async () => {
    if (!user) return;

    try {
      if (isLiked) {
        // Remove like
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('post_id', articleId)
          .eq('user_id', user.id);

        if (error) throw error;

        setIsLiked(false);
        setLikes((prev) => prev - 1);
      } else {
        // Add like with timestamp
        const { error } = await supabase.from('likes').insert({
          post_id: articleId,
          user_id: user.id,
          created_at: new Date().toISOString(),
        });

        if (error) throw error;

        setIsLiked(true);
        setLikes((prev) => prev + 1);
      }
    } catch (err) {
      console.error('Error toggling like:', err.message);
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim() || !user) return;

    try {
      const { error } = await supabase.from('comments').insert({
        post_id: articleId,
        user_id: user.id,
        content: commentText,
        created_at: new Date().toISOString(),
      });

      if (error) throw error;

      setCommentText('');
      fetchArticleData(); // Refresh comments
    } catch (err) {
      console.error('Error submitting comment:', err.message);
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
            className={`text-2xl ${isLiked ? 'text-red-500' : secondaryTextColor} ${!user ? 'cursor-not-allowed opacity-50' : ''}`}
            onClick={user ? toggleLike : undefined}
            title={!user ? 'Log in to like posts' : ''}
          >
            {isLiked ? '❤️' : '🤍'} {likes} Likes
          </button>
          <Link href="/articles/browse" className="font-semibold text-blue-600 hover:text-blue-800">
            Back to articles
          </Link>
        </div>
      </div>

      {/* Comment Zone */}
      <div className={`${cardBackground} ${borderColor} border rounded-xl shadow-2xl p-8 w-2/3 mb-8`}>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className={`w-full p-4 ${inputBackground} ${inputTextColor} ${borderColor} rounded-lg focus:outline-none focus:ring ${isDarkMode ? 'focus:ring-blue-700' : 'focus:ring-blue-300'}`}
          placeholder="Write a comment..."
          title={!user ? 'Log in to comment' : ''}
          disabled={!user}
        />
        <button
          onClick={handleCommentSubmit}
          className={`px-4 py-2 mt-4 text-white rounded-lg ${commentText.trim() && user ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
          disabled={!commentText.trim() || !user}
        >
          Submit Comment
        </button>
      </div>

      {/* Comments Section */}
      <div className={`${cardBackground} ${borderColor} border rounded-xl shadow-2xl p-8 w-2/3`}>
        <h2 className={`text-xl font-bold ${textColor} mb-4`}>Comments</h2>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className={`mb-4 ${borderColor} border-b pb-2`}>
              <p className={`${textColor} font-medium`}>{comment.user?.name || 'Anonymous'}</p>
              <p className={`${secondaryTextColor} text-sm`}>{comment.content}</p>
              <p className={`${secondaryTextColor} text-xs`}>{new Date(comment.created_at).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p className={`${secondaryTextColor} text-sm`}>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}
