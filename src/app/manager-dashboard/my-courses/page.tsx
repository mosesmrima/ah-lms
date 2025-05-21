'use client';

import React, { useState } from 'react';
import {
  CoursesOverview,
  CourseFilterSidebar,
  CourseCard,
} from '@/components/my-courses'; // Using path alias for components
import { Pagination } from '@/components/ui'; // Using shared UI components

const MyCoursesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // Example total pages

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Here you would typically fetch data for the new page
  };

  // Example course data - replace with actual data fetching
  const courses = [
    {
      id: '1',
      title: 'The Course Title',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu tortor vel leo sollicitudin placerat.',
      modules: 23,
      duration: '1 hr 30 Min',
      imageUrl: '', // No image URL, will show placeholder
    },
    {
      id: '2',
      title: 'Another Course Example',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
      modules: 15,
      duration: '2 hr 15 Min',
      imageUrl: '',
    },
    {
      id: '3',
      title: 'Web Development Bootcamp',
      description: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.',
      modules: 45,
      duration: '6 hr 00 Min',
      imageUrl: '',
    },
    {
      id: '4',
      title: 'Data Science Fundamentals',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      modules: 30,
      duration: '4 hr 45 Min',
      imageUrl: '',
    },
  ];

  return (
    <div>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-0">Courses Overview</h1>
        <button className="bg-[#E7343A] hover:bg-red-700 text-white font-semibold py-2.5 px-6 rounded-lg text-sm sm:text-base">
          Create Course
        </button>
      </header>

      <CoursesOverview />

      <section className="mt-10 md:mt-12 border-0">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">My Courses</h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <CourseFilterSidebar />
          </div>
          <div className="lg:col-span-3">
            {courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    title={course.title}
                    description={course.description}
                    modules={course.modules}
                    duration={course.duration}
                    imageUrl={course.imageUrl}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-neutral-500 py-10">
                <p>No courses found.</p> { /* Placeholder for empty state */}
              </div>
            )}
            {courses.length > 0 && (
                <div className="mt-8 flex justify-center">
                     <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyCoursesPage;
