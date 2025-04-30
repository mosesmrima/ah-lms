"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";

interface BackToTopProps {
  className?: string;
}

const BackToTop: React.FC<BackToTopProps> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-8 right-8 z-50 p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110",
            "bg-black border border-red-500",
            "before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-red-600 before:to-red-500 before:blur-md before:opacity-70 before:-z-10",
            "animate-pulse-slow",
            className
          )}
          aria-label="Back to top"
        >
          <ArrowUpIcon className="h-6 w-6 text-white" />
        </button>
      )}
    </>
  );
};

export default BackToTop;
