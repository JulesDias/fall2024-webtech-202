"use client";
import React from "react";
import Link from "next/link"; // Import Link for navigation
import { cn } from "../lib/utils";

export default function ArticleCard({ article, hovered, setHovered }) {
  return (
    <Link href={`/articles/${article.id}`} passHref>
      <div
        style={{ margin: '30px' }}
        onMouseEnter={() => setHovered(article.id)}
        onMouseLeave={() => setHovered(null)}
        className={cn(
          "p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md transition-all duration-300 cursor-pointer",
          hovered !== null && hovered !== article.id && "blur-sm opacity-75"
        )}
      >
        <h2 className="text-xl font-bold text-gray-800 font-FS_Sinclair dark:text-gray-200">
          {article.title}
        </h2>
        <p className="text-gray-600 font-FS_Sinclair dark:text-gray-400">
          By {article.author || "Unknown"}
        </p>
        <p className="text-base text-gray-500 font-FS_Sinclair dark:text-gray-500">
          {article.likes || 0} likes
        </p>
      </div>
    </Link>
  );
}
