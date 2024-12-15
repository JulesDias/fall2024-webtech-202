// Articles page
"use client";
import Link from 'next/link';
import Globe3D from '../../components/Globe3D';
import { motion } from 'framer-motion';

export default function Articles() {


  /*<div className="grid w-full h-full min-h-screen grid-cols-3 grid-rows-4 gap-4 p-4"> */
  return (
    <div className="grid w-full h-full min-h-screen grid-cols-8 gap-4 p-4 overflow-hidden grid-rows-8 hide-scrollbar">
      {/* Title in the top-left corner */}
      <div
        className="flex items-center justify-center col-span-2 col-start-1 row-start-1" style={{ "marginRight": "-50%", "marginTop": "10%" }}>
        <motion.h1 className="text-5xl font-extrabold font-FS_Sinclair"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.25 }}
        >Democratic Dispatches</motion.h1>
      </div>

      <div className="flex flex-col col-span-3 col-start-1 row-start-3 space-y-4" style={{ "marginTop": "-5%", "marginLeft": "10%", "marginRight": "-20%" }}>
        <motion.h2
          className="text-xl text-justify font-FS_Sinclair"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.25, delay: 1 }}
        >
          <b>Welcome to the heart of Super Earth's Democratic Liberty Hub!</b>
        </motion.h2>
        <motion.p
          className="text-xl text-justify font-FS_Sinclair"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.25, delay: 1 }}
        >
          Between liberty-spreading deployment, every Helldiver knows the
          galactic war effort continues at home, supporting morale by sharing
          their exploits!
        </motion.p>
        <motion.p
          className="text-xl text-justify font-FS_Sinclair"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.25, delay: 1 }}
        >
          Approved by Super Earth’s Ministry of Truth, these bites of democracy
          allow every super Citizen to relive every Helldiver's finest moments.
        </motion.p>
        <motion.p
          className="text-xl text-justify font-FS_Sinclair"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.25, delay: 1 }}
        >
          <b>BROWSE</b> through the fearless feats of your comrades!{" "} <br />
          <b>SEARCH</b> for strategic brilliance! <br />Or let the brass hand-pick
          the best in our <b>SUGGESTED POSTS!</b>
        </motion.p>
        <motion.p
          className="text-xl text-justify font-FS_Sinclair"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.25, delay: 1 }}
        >
          Share your story. Strengthen the cause. Democracy needs <b>YOU!</b>
        </motion.p>



      </div>

      {/* Search bar at the top-right */}
      <div className="flex items-center justify-end col-span-4 col-start-3 row-start-1 text-dark-900">
        <input
          type="text"
          placeholder="Search articles..."
          className="w-2/3 px-4 py-2 border rounded-md font-FS_Sinclair focus:outline-none focus:ring focus:ring-yellow-300 "
        />

      </div>

      <div className="items-center justify-end col-span-2 col-start-7 row-start-1 " style={{ "marginTop": "8%" }}>
        <Link
          style={{ "marginLeft": "2%", "marginRight": "2%" }}
          href="/articles/browse"
          className="px-4 py-2 text-white transition bg-blue-600 rounded-md font-FS_Sinclair hover:bg-blue-700 dark:bg-blue-500"
        >
          Browse Articles
        </Link>
        <Link
          style={{ "marginLeft": "2%", "marginRight": "2%" }}
          href="/test"
          className="px-4 py-2 text-white transition bg-blue-600 rounded-md font-FS_Sinclair hover:bg-blue-700 dark:bg-blue-500"
        >
          Suggested Post
        </Link>
      </div>



      {/* Optional Globe3D element */}
      <div className="absolute w-[50vw] h-[50vh] overflow-hidden" style={{ left: '45%', top: '50%' }}>
        <Globe3D />
      </div>
    </div>
  );
}