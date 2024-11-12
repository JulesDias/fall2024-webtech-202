// About page

"use client"
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useRef } from 'react';
import React from "react";
import { InfiniteMovingCards } from "../../components/ui/infinite-moving-cards";


export default function About() {

  const ref = useRef();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 object-cover w-full h-full "
      >
        <source src="/super_earth_flag.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Parallax Component */}
      <Parallax pages={3} ref={ref} className='relative z-10 hide-scrollbar'>
        {/* Head text */}
        <ParallaxLayer offset={0.20} factor={0.5} className="mx-auto text-center max-w-1/3">
          <h1 className="text-5xl font-extrabold text-black dark:text-white font-FS_Sinclair">
            About the Democratic Liberty Hub
          </h1>
        </ParallaxLayer>

        <ParallaxLayer offset={1} factor={0.5} className="mx-auto text-center max-w-1/3 " >
        
        <p className="text-lg text-gray-300 font-FS_Sinclair" style={{margin: 20}}>
            Helldivers is the ultimate "galactic democracy" simulator where the goal is simple: survive the endless onslaught of alien scum while spreading the love of freedom across the stars. You and your fellow Helldivers are the elite of the elite, armed with high-tech weapons, powerful gear, and the unwavering belief that nothing says "liberation" quite like blowing up everything in sight.
            <br /><br />
            This isn't your average stroll through the galaxy. Oh no, it's more like a chaotic dance of death where you can accidentally call in a bombing strike on your own squad, or launch yourself into orbit instead of the planet you meant to land on. It's a game where friendly fire is a real thing—so, remember, "Oops, my bad!" might just be the most frequently spoken phrase.
            <br /><br />
            You'll be diving into hostile planets, dodging alien swarms, and executing missions in a relentless grind for freedom. And hey, if you die (which, spoiler alert, you will), just respawn and get back in there. After all, the galaxy is at war, and democracy is a full-contact sport. So grab your gun, strap on your jetpack, and get ready to sacrifice your body for the greater good... or at least for the hilarious explosions along the way.
            <br /><br />
            Join the fight, Helldiver. The galaxy’s waiting—and it's probably already on fire.
          </p>
        </ParallaxLayer>

        <ParallaxLayer offset={1.5} factor={0.5}>
          <div className="h-[40rem] rounded-md flex flex-col antialiased bg-grid-black/[0.05] dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden font-FS_Sinclair">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
            />
          </div>
        </ParallaxLayer>

      </Parallax>
    </div>
  );
}

const testimonials = [
  {
    quote:
      "I'm [redacted] and this is my favourite Hub",
    name: "HelldiverFan0096",
  },
  {
    quote:
      "Review under investigation for treason",
    name: "********",
    title: "deleted",
  },
  {
    quote: "Amazing Quality. I used this website for me and TWO of my kids. She loves them.",
    name: "SweetSuperEarth001",
  },
  {
    quote:
      "I would like two baguettes please.. oh wait where am I ?",
    name: "OldManOnInternet",
    title: "grocery shopping list",
  },
  {
    quote:
      "My wife said it's Liberty Democratic Hub or her. She will be missed",
    name: "xXNoPainNoGainXx",
    title: "looking for understandable wife",
  },
];