'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import Link from 'next/link';
import { useDarkMode } from '../../../components/DarkmodeContext';
import RichTextEditor from '../../../components/RichTextEditor'; // Import RichTextEditor

export default function Article() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [author, setAuthor] = useState('');
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const { isDarkMode } = useDarkMode();

  const fetchArticleData = async () => {
    setLoading(true);
    try {
      // Fetch article details with author's avatar
      const { data: articleData, error: articleError } = await supabase
        .from('posts')
        .select('*, author:my_users(name, avatar_url)')
        .eq('id', articleId)
        .single();

      if (articleError) throw articleError;

      setArticle(articleData);
      setAuthor({
        name: articleData.author?.name || 'Unknown',
        avatar_url: articleData.author?.avatar_url || '/BasicImage.png', // Default image
      });

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

      // Fetch comments with user avatars
      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select('content, created_at, user:my_users(name, avatar_url)')
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
    if (!commentContent.trim() || !user) return;

    try {
      const { error } = await supabase.from('comments').insert({
        post_id: articleId,
        user_id: user.id,
        content: commentContent,
        created_at: new Date().toISOString(),
      });

      if (error) throw error;

      setCommentContent('');
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

  if (loading) {
    return <p className="mt-8 text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="mt-8 text-center text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col items-center w-full max-w-screen-lg px-4 py-8 mx-auto font-FS_Sinclair">
      {/* Article Zone */}
      <div className={`${cardBackground} ${borderColor} border rounded-xl shadow-2xl p-8 w-full mb-8`}>
        <h1 className={`text-3xl font-extrabold ${textColor} mb-6`}>{article.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: article.content }} className="prose dark:prose-invert"></div>
        <div className="flex items-center mb-4">
          <img
            src={author.avatar_url}
            alt={`${author.name}'s profile`}
            className="w-10 h-10 mr-4 rounded-full"
          />
          <p className={`${secondaryTextColor} text-sm`}>By: {author.name}</p>
        </div>
        <div className="flex items-center justify-between mb-4">
          <button
            className={`text-2xl ${isLiked ? 'text-red-500' : secondaryTextColor} ${!user ? 'cursor-not-allowed opacity-50' : ''
              }`}
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
      <div className={`${cardBackground} ${borderColor} border rounded-xl shadow-2xl p-8 w-full mb-8`}>
        <RichTextEditor content={commentContent} setContent={setCommentContent} />
        <button
          onClick={handleCommentSubmit}
          className={`px-4 py-2 mt-4 text-white rounded-lg ${commentContent.trim() && user ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          disabled={!commentContent.trim() || !user}
        >
          Submit Comment
        </button>
      </div>

      {/* Comments Section */}
      <div className={`${cardBackground} ${borderColor} border rounded-xl shadow-2xl p-8 w-full`}>
        <h2 className={`text-xl font-bold ${textColor} mb-4`}>Comments</h2>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className={`mb-4 ${borderColor} border-b pb-2 flex items-start`}>
              <img
                src={comment.user?.avatar_url || '/BasicImage.png'}
                alt={`${comment.user?.name || 'Anonymous'}'s profile`}
                className="w-8 h-8 mr-4 rounded-full"
              />
              <div>
                <p className={`${textColor} font-medium`}>{comment.user?.name || 'Anonymous'}</p>
                <div dangerouslySetInnerHTML={{ __html: comment.content }} className="prose dark:prose-invert"></div>
                <p className={`${secondaryTextColor} text-xs`}>{new Date(comment.created_at).toLocaleString()}</p>
              </div>
            </div>
          ))
        ) : (
          <p className={`${secondaryTextColor} text-sm`}>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}
