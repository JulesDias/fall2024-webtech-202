// Articles page
"use client";
import Link from 'next/link';
import Globe3D from '../../components/Globe3D';
import { motion } from 'framer-motion';

export default function Articles() {
  const articles = [
    { id: 1, title: 'First Article' },
    { id: 2, title: 'Second Article' },
  ];


  /*<div className="grid w-full h-full min-h-screen grid-cols-3 grid-rows-4 gap-4 p-4"> */
  return (
    <div className="grid w-full h-full min-h-screen grid-cols-8 gap-4 p-4 grid-rows-8">
      {/* Title in the top-left corner */}
      <div 
      className="flex items-center justify-center col-span-2 col-start-1 row-start-1" style={{ "marginRight": "-50%", "marginTop" : "-10%"}}>
        <motion.h1 className="text-5xl font-extrabold font-FS_Sinclair"
        initial = {{ y : -30, opacity: 0}}
        animate = {{y: 0 , opacity: 1}}
        transition={{duration : 1.5, delay : 0.25}}
        >Democratic Dispatches</motion.h1>
      </div>

      <div className="flex items-center justify-center col-span-2 col-start-1 row-start-2 " style={{ "marginRight": "-50%", "marginTop": "25%", "marginLeft" : "10%"}}>
        <motion.p 
        className="text-xl font-FS_Sinclair" 
        style={{"textAlign" : "justify", "textJustify" : "inter-word"}}
        initial = {{ y : -20, opacity: 0}}
        animate = {{y: 0 , opacity: 1}}
        transition={{duration : 1.5, delay : 1}}
        > <b>Welcome to the heart of Super Earth's Democratic Liberty Hub!</b> <br/>
        Between liberty-spreading deployment, every Helldiver knows the galactic war effort continues at home, supporting morale by sharing their exploits! 
        Approved by Super Earth’s Ministry of Truth, these bites of democracy allows every super Citizen to relive every Helldiver's finest moments. <br/>
        <b>BROWSE</b> through the fearless feats of your comrades, <br/><b>SEARCH</b> for strategic brilliance,<br/> Or let the brass hand-pick the best in our <b>SUGGESTED POSTS!</b><br/>
        Share your story. Strengthen the cause. Democracy needs <b>YOU!</b> 
        </motion.p>
        
        
        
      </div>

      {/* Search bar at the top-right */}
      <div className="flex items-center justify-end col-span-4 col-start-4 row-start-1">
        <input
          type="text"
          placeholder="Search articles..."
          className="w-2/3 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 font-FS_Sinclair"
        />
      </div>

      {/* Article links in the middle-center-right */}
      <div className="flex justify-end col-span-3 col-start-4 row-span-4 row-start-3 pr-8">
        <ul className="w-1/2 space-y-4">
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
      </div>

      {/* Optional Globe3D element */}
      <div className="absolute w-[50vw] h-[50vh] overflow-hidden" style={{ right: '55%', top: '50%' }}>
        <Globe3D />
      </div>
    </div>
  );
}
