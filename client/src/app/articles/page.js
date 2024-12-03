"use client";
import Link from "next/link";
import Globe3D from "../../components/Globe3D";
import { motion } from "framer-motion";
import { ArticleCaroussel } from "../../components/ui/ArticleCaroussel";

export default function Articles() {
  const articles = [
    { id: 1, title: "First Article" },
    { id: 2, title: "Second Article" },
  ];

  return (
    <div className="grid w-full h-full min-h-screen grid-cols-8 grid-rows-8 gap-4 p-4">
      {/* Title in the top-left corner */}
      <div className="col-span-3 col-start-1 row-start-1 flex items-center" style={{"marginTop": "-5%"}}>
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold font-FS_Sinclair"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.25 }}
        >
          Democratic Dispatches
        </motion.h1>
      </div>

      {/* Flavor text in the middle-left */}
      <div className="col-span-3 col-start-1 row-start-2 flex flex-col space-y-4" style={{"marginTop": "-5%"}}>
        <motion.p
          className="text-sm md:text-lg font-FS_Sinclair text-justify"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.25, delay: 1 }}
        >
          <b>Welcome to the heart of Super Earth's Democratic Liberty Hub!</b>
        </motion.p>
        <motion.p
          className="text-sm md:text-lg font-FS_Sinclair text-justify"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.25, delay: 1 }}
        >
          Between liberty-spreading deployment, every Helldiver knows the
          galactic war effort continues at home, supporting morale by sharing
          their exploits!
        </motion.p>
        <motion.p
          className="text-sm md:text-lg font-FS_Sinclair text-justify"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.25, delay: 1 }}
        >
          Approved by Super Earth’s Ministry of Truth, these bites of democracy
          allow every super Citizen to relive every Helldiver's finest moments.
        </motion.p>
        <motion.p
          className="text-sm md:text-lg font-FS_Sinclair text-justify"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.25, delay: 1 }}
        >
          <b>BROWSE</b> through the fearless feats of your comrades,{" "}
          <b>SEARCH</b> for strategic brilliance, or let the brass hand-pick
          the best in our <b>SUGGESTED POSTS!</b>
        </motion.p>
        <motion.p
          className="text-sm md:text-lg font-FS_Sinclair text-justify"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.25, delay: 1 }}
        >
          Share your story. Strengthen the cause. Democracy needs <b>YOU!</b>
        </motion.p>
      </div>

      {/* Globe in the lower-left corner */}
      <div className="col-span-3 col-start-1 row-start-5 relative" style={{"marginTop" : "5%"}}>
        <div className="w-full h-[30vh] md:w-[50vw] md:h-[50vh]">
          <Globe3D />
        </div>
      </div>

      {/* Search bar at the top middle-right */}
      <div className="col-span-4 col-start-5 row-start-1 flex items-center justify-end">
        <input
          type="text"
          placeholder="Search articles..."
          className="w-full md:w-2/3 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 font-FS_Sinclair"
        />
      </div>

      {/* Article buttons in the lower middle-right */}
      <div className="col-span-3 col-start-5 row-start-4 flex flex-col items-end space-y-4">
              <ArticleCaroussel/>
      </div>

    </div>
  );
}


/*
        <ul className="w-full md:w-2/3">
          {articles.map((article) => (
            <li
              key={article.id}
              className="p-2 text-sm transition bg-gray-100 rounded-lg shadow hover:shadow-lg"
            >
              <Link
                href={`/articles/${article.id}`}
                className="text-base text-black hover:text-blue-500 font-FS_Sinclair"
              >
                {article.title}
              </Link>
            </li>
          ))}
        </ul>


*/