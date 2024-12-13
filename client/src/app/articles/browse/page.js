"use client";
// pages/articles/index.js
import ArticleGrid from "../../../components/ArticleGrid";

export default function ArticlesPage() {
  return (
    <div className="flex items-start justify-center min-h-screen px-16 py-16">
      <div className="h-full ">
        <ArticleGrid />
      </div>
    </div>
  );
}
