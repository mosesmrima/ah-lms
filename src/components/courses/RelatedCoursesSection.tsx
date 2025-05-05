"use client";
import React from 'react';
import { CourseCard } from "@/components/courses";

interface RelatedCoursesSectionProps {
  courses: Array<{
    id: number;
    title: string;
    image: string;
    author: string;
    authorAvatar: string;
    category?: string;
  }>;
}

const RelatedCoursesSection: React.FC<RelatedCoursesSectionProps> = ({ courses }) => {
  return (
    <section className="py-12 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-8">Related Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedCoursesSection;
