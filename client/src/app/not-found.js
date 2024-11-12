"use client";

import { useDarkMode } from '../components/DarkmodeContext';
import Link from 'next/link';

export default function NotFound() {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="flex items-center justify-center w-full h-screen p-4 overflow-hidden">
      <div className="max-w-lg text-left">
        <h1 className="text-5xl font-extrabold text-black dark:text-white font-FS_Sinclair">
          404 - Mission Objective Not Found
        </h1>
        <br /><br />
        <p className="text-lg text-black dark:text-gray-300 font-FS_Sinclair">
          <i>Attention Helldiver</i>
          <br /><br />
          It appears you've strayed from the mission objective and wandered into uncharted territory. This page isn’t where the action is – it’s a dead zone.
          <br /><br />
          <b>Current Status:</b> Mission Data Not Found
          <br />
          <b>Threat Level:</b> Low, but vigilance is advised.
          <br /><br />
          Don’t worry, Helldiver. HQ is here to guide you back. Use the navigation tools to regroup with your squad or return to base.
          <br />
          The Federation relies on you; stay focused, stay lethal, and let’s get back to crushing the enemy!
        </p>
        <br />
        <div className="flex justify-center">
          <Link href="/">
            <button
              role="button"
              className="px-8 py-3 text-lg text-black bg-gray-200 rounded-full dark:text-white font-FS_Sinclair hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-900 dark:hover:bg-gray-800"
            >
              Return to Mothership 🚀
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
