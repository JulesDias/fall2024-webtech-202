// About page

"use client"
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import {useRef} from 'react';
import React from "react";

export default function About() {

    
  //var parallax
  const ref = useRef();


  return (
    
    <Parallax pages={3} ref={ref} className='hide-scrollbar'>

    {/*background planet component */}
    <ParallaxLayer offset={0.5} factor={3}>
      
    </ParallaxLayer>

    {/*Head text*/}
    <ParallaxLayer offset={0.20} factor={0.5} className="mx-auto text-center max-w-1/3 " >
    <h1 className="text-5xl  font-extrabold text-black dark:text-white font-FS_Sinclair">
      About the Democratic Liberty Hub
    </h1>
    </ParallaxLayer>

    </Parallax>
    
  );
}
