"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export interface CourseCardProps {
  title: string;
  image: string;
  author: string;
  authorAvatar: string;
  index?: number;
  priority?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  title, 
  image, 
  author, 
  authorAvatar,
  index,
  priority = false
}) => {
  return (
    <div 
      onClick={() => window.location.href = `/courses/${title.toLowerCase().replace(/\s+/g, '-')}`}
      className="group relative bg-[#1E1E1E] rounded-xl border-2 border-transparent overflow-hidden transition hover:shadow-lg hover:border-red-600 min-h-[320px] sm:min-h-[350px] md:min-h-[400px] flex flex-col justify-end cursor-pointer">
      {/* Image fills the card */}
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
        priority={priority || (index !== undefined && index < 3)}
      />
      {/* Gradient overlay with content - reduced to ~1/3 of card height */}
      <div className="absolute bottom-0 left-0 w-full pt-6 pb-3 px-3 bg-gradient-to-t from-red-700/90 to-[#1E1E1E]/80 flex flex-col justify-end">
        <h3 className="font-bold text-base sm:text-lg text-white mb-1.5 text-center drop-shadow-md group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-yellow-300 transition-all duration-300">{title}</h3>
        <div className="flex items-center justify-center mb-2">
          <Image src={authorAvatar} alt={author} width={24} height={24} className="rounded-full aspect-square object-cover w-6 h-6 mr-1.5" />
          <span className="text-xs sm:text-sm text-gray-200">by <span className="text-red-300 font-medium">{author}</span></span>
        </div>
        <Button customVariant="primary" className="w-full text-xs sm:text-sm py-1.5 mt-1 rounded-sm">Start Learning</Button>
      </div>
    </div>
  );
};

export default CourseCard;
