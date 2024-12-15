'use client';

import Articles from '../../../components/ArticleGrid';

export default function BrowsePage() {
  return (
    <div className="min-h-screen p-8 font-FS_Sinclair">
      <h1 className="mb-6 text-3xl font-bold text-center text-gray-800 dark:text-gray-200">
        Browse Articles
      </h1>
      <Articles />
    </div>
  );
}
