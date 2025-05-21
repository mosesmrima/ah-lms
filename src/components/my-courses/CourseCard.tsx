import React from 'react';
import Image from 'next/image';
import { DocumentTextIcon, ClockIcon } from '@heroicons/react/24/outline';

interface CourseCardProps {
  title: string;
  description: string;
  modules: number;
  duration: string;
  imageUrl?: string; // Optional image URL
}

const CourseCard: React.FC<CourseCardProps> = ({ title, description, modules, duration, imageUrl }) => {
  return (
    <div className="bg-neutral-800 rounded-lg overflow-hidden flex flex-col">
      <div className="w-full h-48 bg-neutral-700 relative">
        {imageUrl ? (
          <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-500">
            {/* Placeholder for image */}
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-neutral-400 text-sm mb-4 flex-grow leading-relaxed">
          {description}
        </p>
        <div className="flex items-center justify-between text-xs text-neutral-400 mt-auto">
          <div className="flex items-center">
            <DocumentTextIcon className="h-4 w-4 mr-1.5 text-[#E7343A]" />
            <span>{modules} Modules</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="h-4 w-4 mr-1.5 text-[#E7343A]" />
            <span>{duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
