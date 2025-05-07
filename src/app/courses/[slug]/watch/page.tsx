'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

// Import custom components
import VideoPlayer from '@/components/courses/VideoPlayer';
import TakeNotesButton from '@/components/courses/TakeNotesButton';
import AttachedFiles from '@/components/courses/AttachedFiles';
import LessonsList from '@/components/courses/LessonsList';
import StudentsSection from '@/components/courses/StudentsSection';
import DashboardNavbar from '@/components/layout/DashboardNavbar';
import Footer from '@/components/layout/Footer';

// Mock data for the page
const mockLessonData = {
  id: 'lesson-1',
  title: 'Preparing the artboard',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada venenatis neque ac rutrum. Aliquam rhoncus leo vitae augue commodo imperdiet. Curabitur sit amet lectus est. Proin in dui ac elit sollicitudin bibendum vel id dui. Curabitur varius blandit purus, et volutpat odio fermentum vitae. Donec ut accumsan risus. Praesent egestas augue mollis, nec fermentum augue blandit sed. Aenean id orci cursus, eleifend ac lectus a, posuere ante.',
  videoUrl: '',
  thumbnailUrl: 'https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg',
  duration: '10:59',
  currentTime: '04:35',
  courseId: 'design-for-startups',
  courseTitle: 'Introduction to design for startups'
};

const mockAttachedFiles = [
  { id: 'file-1', name: 'Wireframe 3fsd.psd', size: '12 MB', type: 'psd' },
  { id: 'file-2', name: 'Wireframe 2fsd.psd', size: '10 MB', type: 'psd' },
  { id: 'file-3', name: 'Wireframe 1fsd.psd', size: '8 MB', type: 'psd' },
  { id: 'file-4', name: 'Resources.pdf', size: '5 MB', type: 'pdf' }
];

const mockLessons: Array<{
  id: string;
  title: string;
  duration: string;
  status: 'completed' | 'current' | 'upcoming';
}> = [
  { id: 'lesson-1', title: 'Choosing right tools', duration: '10:59', status: 'completed' },
  { id: 'lesson-2', title: 'Browsing for resources', duration: '10:59', status: 'completed' },
  { id: 'lesson-3', title: 'Preparing the artboard', duration: '10:59', status: 'completed' },
  { id: 'lesson-4', title: 'Defining color scheme', duration: '10:59', status: 'completed' },
  { id: 'lesson-5', title: 'Power of Illustrations', duration: '10:59', status: 'current' },
  { id: 'lesson-6', title: 'Designing basic buttons', duration: '10:59', status: 'upcoming' },
  { id: 'lesson-7', title: 'Getting inspirations from others', duration: '10:59', status: 'upcoming' },
  { id: 'lesson-8', title: 'UI kit - what is it?', duration: '10:59', status: 'upcoming' },
  { id: 'lesson-9', title: 'Basics of a UI kit', duration: '10:59', status: 'upcoming' }
];

const mockStudents = [
  { id: 'student-1', name: 'Alice Bee', avatarUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' },
  { id: 'student-2', name: 'John Doe', avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' },
  { id: 'student-3', name: 'Jane Smith', avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg' },
  { id: 'student-4', name: 'Mike Johnson', avatarUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg' },
  { id: 'student-5', name: 'Sarah Williams', avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' },
  { id: 'student-6', name: 'David Brown', avatarUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg' }
];

export default function CourseWatchPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <DashboardNavbar user={{ name: "John Doe" }} />
      <div className="mb-8"></div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Video Player and Notes */}
          <div className="lg:col-span-8 relative">
            {/* Vertical Line on the Right */}
            <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-px bg-[#828282] -mr-4"></div>
            {/* Back Button */}
            <div className="mb-4">
              <Link href={`/courses/${mockLessonData.courseId}`} className="flex items-center text-[#828282] hover:text-gray-300">
                <ChevronLeftIcon className="h-5 w-5 mr-1" />
                <span>{mockLessonData.courseTitle}</span>
              </Link>
            </div>
            
            {/* Video Player */}
            <div className="mb-8">
              <VideoPlayer 
                thumbnailUrl={mockLessonData.thumbnailUrl}
                duration={mockLessonData.duration}
                currentTime={mockLessonData.currentTime}
              />
            </div>
            
            {/* Take Notes Button */}
            <div className="mb-4">
              <TakeNotesButton 
                courseId={mockLessonData.courseId}
                lessonId={mockLessonData.id}
              />
            </div>
            
            {/* Horizontal Line */}
            <div className="border-b border-[#828282] mb-8"></div>
            
            {/* Lesson Summary */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{mockLessonData.title}</h2>
              <p className="text-gray-400">
                {mockLessonData.description}
              </p>
            </div>
            
            {/* Attached Files */}
            <AttachedFiles files={mockAttachedFiles} />
          </div>
          
          {/* Right Column - Lessons List and Students */}
          <div className="lg:col-span-4">
            {/* Lessons List */}
            <div className="mb-8">
              <LessonsList
                courseTitle={mockLessonData.courseTitle}
                lessons={mockLessons}
                onSelectLesson={() => {}}
              />
            </div>
            
            {/* Students Taking the Course */}
            <StudentsSection 
              students={mockStudents}
            />
          </div>
        </div>
      </div>
      <div className="mt-8"></div>
      <Footer />
    </div>
  );
}
