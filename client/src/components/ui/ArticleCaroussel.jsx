"use client";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export const ArticleCaroussel = () => {
  const articles = [
    { src: "/artImages/ART1.jpg" },
    { src: "/artImages/ART2.jpg" },
    { src: "/artImages/ART3.jpg" },

  ];

  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % articles.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + articles.length) % articles.length);
  };

  const isActive = (index) => index === active;

  useEffect(() => {
    const interval = setInterval(handleNext, 5000); // Autoplay every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  return (
    <div className="max-w-lg md:max-w-3xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-20">
      <div className="relative">
        <div className="relative h-80 w-full">
          {/* Explicit height set to 80 for consistent size */}
          <AnimatePresence>
            {articles.map((article, index) => (
              <motion.div
                key={article.src}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  z: -100,
                  rotate: randomRotateY(),
                }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.7,
                  scale: isActive(index) ? 1 : 0.95,
                  z: isActive(index) ? 0 : -100,
                  rotate: isActive(index) ? 0 : randomRotateY(),
                  zIndex: isActive(index)
                    ? 999
                    : articles.length + 2 - index,
                  y: isActive(index) ? [0, -80, 0] : 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  z: 100,
                  rotate: randomRotateY(),
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                className="absolute inset-0"
              >
                <Image
  src={article.src}
  alt={`Article ${index + 1}`}
  width={800}
  height={400}
  style={{
    objectFit: "cover",
    width: "100%",
    height: "100%",
    borderRadius: "1.5rem",
  }}
/>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="flex justify-center gap-4 pt-8">
          <button
            onClick={handlePrev}
            className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
          >
            <IconArrowLeft className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
          </button>
          <button
            onClick={handleNext}
            className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
          >
            <IconArrowRight className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
