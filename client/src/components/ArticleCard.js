"use client";
import React from "react";
import Link from "next/link"; // Import Link for navigation
import { cn } from "../lib/utils";

export default function ArticleCard({ article }) {
  return (
    <Link href={`/articles/${article.id}`} passHref>
      <div
        style={{ margin: '30px' }}
        className={cn(
          "p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md transition-all duration-300 cursor-pointer"
        )}
      >
        <h2 className="text-xl font-bold text-gray-800 font-FS_Sinclair dark:text-gray-200">
          {article.title}
        </h2>
        <p className="text-gray-600 font-FS_Sinclair dark:text-gray-400">
          By {article.author || "Unknown"}
        </p>
        <p className="text-base text-gray-500 font-FS_Sinclair dark:text-gray-500">
          {article.likes} likes
        </p>
      </div>
    </Link>
  );
}
