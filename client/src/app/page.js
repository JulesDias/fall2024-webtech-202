"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { useDarkMode } from '../components/DarkmodeContext';
import { motion } from 'framer-motion';

export default function Home({ }) {

  //var parallax
  const ref = useRef();

  const { isDarkMode } = useDarkMode();

  //declaring both light and dark mode titles
  const lightTitle = "/HD2_title_clear.png";
  const darkTitle = "/HD2_title_dark.png";


  const titleDiplayed = isDarkMode ? darkTitle : lightTitle;

  //images displayed on the top of the scrollpage
  const bgTop = "/background.png";
  const frontTop = "/layerAvant.png";

  //code to use screen width in code
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    // This will run only on the client side
    setScreenWidth(window.screen.availWidth);  // Get the screen width when the component is mounted
  }, []);



  return (
    <div>
      <Parallax pages={3.25} ref={ref} className='hide-scrollbar'>

        {/*top background image  */}
        <ParallaxLayer offset={0} factor={2} speed={0.15} className='w-screen'>
          <img src={bgTop} style={{ width: '100%', height: 'auto' }} />
        </ParallaxLayer>

        {/*top front layer*/}
        <ParallaxLayer offset={1} factor={2} speed={0.40} className='w-screen'>
          <img src={frontTop} style={{ width: '100%', height: 'auto' }} />
        </ParallaxLayer>

        {/*title layer */}
        <ParallaxLayer offset={0} factor={0.80} speed={1} className="flex justify-center w-full mt-0 ">
          <motion.img
            src={titleDiplayed}
            width={screenWidth * 3 / 4}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
          />
        </ParallaxLayer>

        {/*flavor quote*/}
        <ParallaxLayer offset={1} factor={0.5} speed={0.5}>
          <p className="text-lg text-center text-white dark:text-gray-300 ">
            <em>
              "The Earth is the cradle of humanity, but mankind cannot stay in the cradle forever" - Tsiolkovsky
            </em>
          </p>
        </ParallaxLayer>


        {/*description background*/}
        <ParallaxLayer offset={2.5} factor={1.5} style={{ backgroundColor: "#06070b" }} />

        {/*description*/}
        <ParallaxLayer offset={2.25} factor={1.5} className="mx-auto text-center max-w-1/3 " >
          <h1 className="text-5xl font-extrabold text-white font-FS_Sinclair">
            Helldivers : Freedom, Explosions, and Friendly Fire
          </h1>
          <br /><br />
          <p className="text-lg text-gray-300 font-FS_Sinclair" style={{ margin: 20 }}>
            Helldivers is the ultimate "galactic democracy" simulator where the goal is simple: survive the endless onslaught of alien scum while spreading the love of freedom across the stars. You and your fellow Helldivers are the elite of the elite, armed with high-tech weapons, powerful gear, and the unwavering belief that nothing says "liberation" quite like blowing up everything in sight.
            <br /><br />
            This isn't your average stroll through the galaxy. Oh no, it's more like a chaotic dance of death where you can accidentally call in a bombing strike on your own squad, or launch yourself into orbit instead of the planet you meant to land on. It's a game where friendly fire is a real thing—so, remember, "Oops, my bad!" might just be the most frequently spoken phrase.
            <br /><br />
            You'll be diving into hostile planets, dodging alien swarms, and executing missions in a relentless grind for freedom. And hey, if you die (which, spoiler alert, you will), just respawn and get back in there. After all, the galaxy is at war, and democracy is a full-contact sport. So grab your gun, strap on your jetpack, and get ready to sacrifice your body for the greater good... or at least for the hilarious explosions along the way.
            <br /><br />
            Join the fight, Helldiver. The galaxy’s waiting—and it's probably already on fire.
          </p>

          <div className="relative z-20 mt-12">
            <Link href="/articles/">
              <button
                role="button"
                className="px-8 py-3 text-lg text-black bg-gray-200 rounded-full font-FS_Sinclair hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:text-white dark:bg-gray-900 dark:hover:bg-gray-800"
              >
                Explore the galaxy 💫
              </button>
            </Link>
          </div>
        </ParallaxLayer>



      </Parallax>
    </div>
  );
}