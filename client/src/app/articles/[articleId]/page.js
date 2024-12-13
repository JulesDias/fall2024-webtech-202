// Article detail page
'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { useDarkMode } from '../../../components/DarkmodeContext';

export default function Article() {
  const { articleId } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const { isDarkMode } = useDarkMode();

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const cardBackground = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = isDarkMode ? 'text-gray-200' : 'text-gray-900';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const secondaryTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const inputBackground = isDarkMode ? 'bg-gray-700' : 'bg-gray-100';
  const inputTextColor = isDarkMode ? 'text-gray-200' : 'text-gray-900';

  return (
    <div className="flex flex-col items-center h-screen pt-8 font-FS_Sinclair">
      {/* Article Zone */}
      <div className={`${cardBackground} ${borderColor} border rounded-xl shadow-2xl p-8 w-2/3 mb-8`}>
        <h1 className={`text-3xl font-extrabold ${textColor} mb-6`}>Article Title {articleId}</h1>
        <p className={`${secondaryTextColor} text-lg leading-relaxed mb-8`}>
          Article content goes here. This is a placeholder for the main body of the article. The text should be styled for readability and visual appeal.
        </p>
        <div className="flex items-center justify-between mb-4">
          <button 
            className={`text-2xl ${isLiked ? 'text-red-500' : secondaryTextColor}`} 
            onClick={toggleLike}
          >
            {isLiked ? '❤️' : '🤍'} {isLiked ? 13 : 12} Likes
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

        <div className="mt-8">
          <h2 className={`text-xl font-bold mb-4 ${textColor}`}>Comments</h2>
          <div className="space-y-4">
            <div className={`p-4 ${borderColor} rounded-lg`}>
              <p className={textColor}>This is a nested comment. Great article!</p>
              <span className={`text-sm ${secondaryTextColor}`}>- User123</span>
            </div>
            <div className={`p-4 ${borderColor} rounded-lg`}>
              <p className={textColor}>Another insightful comment here!</p>
              <span className={`text-sm ${secondaryTextColor}`}>- User456</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
