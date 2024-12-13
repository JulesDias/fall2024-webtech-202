"use client";
import { useState } from "react";
import ArticleCard from "./ArticleCard";

const articles = [
  { id: 1, title: "Article One", author: "Author A", likes: 24 },
  { id: 2, title: "Article Two", author: "Author B", likes: 42 },
  { id: 3, title: "Article Three", author: "Author C", likes: 18 },
  { id: 4, title: "Article Four", author: "Author D", likes: 36 },
  { id: 5, title: "Article Five", author: "Author E", likes: 12 },
  { id: 6, title: "Article Six", author: "Author F", likes: 53 },
  { id: 7, title: "Article Seven", author: "Author G", likes: 27 },
  { id: 8, title: "Article Eight", author: "Author H", likes: 19 },
  { id: 9, title: "Article Nine", author: "Author I", likes: 45 },
  { id: 10, title: "Article Ten", author: "Author J", likes: 30 },
];

const ITEMS_PER_PAGE = 9;

export default function ArticleGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const [hovered, setHovered] = useState(null);

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentArticles = articles.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="grid flex-grow grid-cols-1 gap-12 md:grid-cols-3">
        {currentArticles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            hovered={hovered}
            setHovered={setHovered}
          />
        ))}
      </div>
      <div className="flex justify-between mt-10">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-6 py-3 text-gray-600 bg-gray-200 rounded-lg font-FS_Sinclair dark:bg-gray-800 dark:text-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg text-gray-600 font-FS_Sinclair dark:text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-6 py-3 text-gray-600 bg-gray-200 rounded-lg font-FS_Sinclair dark:bg-gray-800 dark:text-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
