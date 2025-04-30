"use client";

import React from 'react';
import Image from 'next/image';
import { PageLayout } from '@/components/layout';
import { CourseCard } from '@/components/courses';
import { Button } from '@/components/ui/Button';
import PageTransition from '@/components/animations/PageTransition';
import AnimateOnScroll from '@/components/animations/AnimateOnScroll';
import StaggeredAnimation from '@/components/animations/StaggeredAnimation';

// Using the shared CourseCard component from src/components/courses/CourseCard.tsx

export default function CoursesPage() {
  // Course data
  const courses = Array(6).fill({
    title: 'Data Security',
    instructor: 'Madison Blue',
    image: '/images/User on laptop.png',
  });

  // Filter categories
  const categories = [
    'All Course',
    'Coming Soon',
    'Just Added',
    'Trending',
    'Most Popular',
  ];

  const topics = [
    'Finance',
    'Cyber Security',
    'Entrepreneurship',
    'Technology',
    'Innovation',
    'Leadership',
    'Personal Development',
    'Investing',
    'Wealth Creation',
  ];

  return (
    <PageTransition>
      <PageLayout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20">
          {/* Filter Section */}
          <AnimateOnScroll direction="down" className="w-full">
            <div className="bg-[#111] border border-gray-700 rounded-lg p-6 md:p-8 mb-12 shadow-lg">
              <div className="flex flex-col justify-between items-start gap-6 w-full">
                <div className="w-full">
                <h3 className="text-white text-lg font-medium mb-5 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-[#E7343A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filter Courses
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="Search courses..." 
                      className="bg-[#0A0A0A] border border-gray-700 rounded-md px-4 py-3 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-[#E7343A] focus:border-transparent transition-all duration-300"
                    />
                    <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-[#E7343A] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  
                  <div className="relative group">
                    <select className="bg-[#0A0A0A] border border-gray-700 rounded-md px-4 py-3 pr-10 w-full appearance-none focus:outline-none focus:ring-2 focus:ring-[#E7343A] focus:border-transparent transition-all duration-300">
                      <option>Categories</option>
                      <option>Cyber Security</option>
                      <option>Programming</option>
                      <option>Data Science</option>
                    </select>
                    <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-[#E7343A] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="relative group flex-grow">
                      <select className="bg-[#0A0A0A] border border-gray-700 rounded-md px-4 py-3 pr-10 w-full appearance-none focus:outline-none focus:ring-2 focus:ring-[#E7343A] focus:border-transparent transition-all duration-300">
                        <option>Lecture Length</option>
                        <option>Short (&lt; 1 hour)</option>
                        <option>Medium (1-3 hours)</option>
                        <option>Long (&gt; 3 hours)</option>
                      </select>
                      <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-[#E7343A] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    
                    <button className="bg-[#E7343A] hover:bg-[#c62d32] text-white px-4 py-3 rounded-md transition-colors duration-300 flex items-center whitespace-nowrap">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                      Apply
                    </button>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
          {/* Sidebar and Courses Grid */}
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
            {/* Sidebar */}
            <AnimateOnScroll direction="left" className="w-full md:w-64 flex-shrink-0 mb-8 md:mb-0">
              <div className="space-y-6">
                {/* Course Type Filters */}
                <div className="space-y-3">
                  {categories.map((category, index) => (
                    <div 
                      key={index} 
                      className={`cursor-pointer py-2 px-2 rounded hover:bg-gray-800 transition-colors ${category === 'All Course' ? 'text-white font-medium' : 'text-gray-400 hover:text-white'}`}
                    >
                      {category}
                    </div>
                  ))}
                </div>
                
                {/* Topic Filters */}
                <div className="space-y-3 mt-10">
                  {topics.map((topic, index) => (
                    <div 
                      key={index} 
                      className={`cursor-pointer py-2 px-2 rounded hover:bg-gray-800 transition-colors ${topic === 'Cyber Security' ? 'text-[#E7343A] font-medium' : 'text-gray-400 hover:text-white'}`}
                    >
                      {topic}
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
            
            {/* Courses Grid */}
            <div className="flex-1">
              <StaggeredAnimation className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {courses.map((course, index) => (
                  <CourseCard 
                    key={index}
                    title={course.title}
                    author={course.instructor}
                    authorAvatar="/images/Sally-4.png"
                    image={course.image}
                    index={index}
                  />
                ))}
              </StaggeredAnimation>
              
              {/* Pagination */}
              <AnimateOnScroll direction="up" delay={0.3} className="flex flex-wrap justify-center mt-16 mb-8 gap-2 md:gap-3">
                <button className="px-3 sm:px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-800 hover:border-[#E7343A] transition-colors duration-300 flex items-center text-sm sm:text-base">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                  First
                </button>
                <button className="px-3 sm:px-4 py-2 bg-[#E7343A] rounded-md hover:bg-[#c62d32] transition-colors duration-300 font-medium text-sm sm:text-base min-w-[32px] sm:min-w-[40px]">1</button>
                <button className="px-3 sm:px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-800 hover:border-[#E7343A] transition-colors duration-300 text-sm sm:text-base min-w-[32px] sm:min-w-[40px]">2</button>
                <button className="px-3 sm:px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-800 hover:border-[#E7343A] transition-colors duration-300 text-sm sm:text-base min-w-[32px] sm:min-w-[40px]">3</button>
                <button className="hidden sm:block px-3 sm:px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-800 hover:border-[#E7343A] transition-colors duration-300 text-sm sm:text-base min-w-[32px] sm:min-w-[40px]">4</button>
                <button className="hidden sm:block px-3 sm:px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-800 hover:border-[#E7343A] transition-colors duration-300 text-sm sm:text-base min-w-[32px] sm:min-w-[40px]">5</button>
                <button className="px-3 sm:px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-800 hover:border-[#E7343A] transition-colors duration-300 flex items-center text-sm sm:text-base">
                  Last
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </button>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </PageLayout>
    </PageTransition>
  );
}
