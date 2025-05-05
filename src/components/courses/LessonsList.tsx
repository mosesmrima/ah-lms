import React from 'react';
import { CheckIcon, PlayIcon, PlusIcon } from '@heroicons/react/24/solid';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface LessonsListProps {
  courseTitle: string;
  lessons: Lesson[];
  onSelectLesson: (lessonId: string) => void;
}

const LessonsList: React.FC<LessonsListProps> = ({ 
  courseTitle, 
  lessons, 
  onSelectLesson 
}) => {
  return (
    <div className="bg-[#1A1A1A] rounded-lg p-4">
      <h3 className="text-xl font-bold mb-4 text-white">{courseTitle}</h3>
      
      <div className="space-y-2">
        {lessons.map((lesson) => (
          <div 
            key={lesson.id} 
            className={`flex items-center p-2 rounded cursor-pointer transition duration-300 ${
              lesson.status === 'current' 
                ? 'bg-[#E7343A] bg-opacity-20' 
                : 'hover:bg-[#222]'
            }`}
            onClick={() => onSelectLesson(lesson.id)}
          >
            <div className={`${getStatusBgColor(lesson.status)} rounded-full p-1 mr-3`}>
              {getStatusIcon(lesson.status)}
            </div>
            <div className="flex-1">
              <p className="text-sm text-white">{lesson.title}</p>
            </div>
            <div className="text-xs text-gray-400">{lesson.duration}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to get background color based on lesson status
const getStatusBgColor = (status: string): string => {
  switch (status) {
    case 'completed':
      return 'bg-green-500';
    case 'current':
      return 'bg-red-500';
    case 'upcoming':
      return 'bg-gray-600';
    default:
      return 'bg-gray-600';
  }
};

// Helper function to get icon based on lesson status
const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckIcon className="w-4 h-4 text-white" />;
    case 'current':
      return <PlayIcon className="w-4 h-4 text-white" />;
    case 'upcoming':
      return <PlusIcon className="w-4 h-4 text-white" />;
    default:
      return <PlusIcon className="w-4 h-4 text-white" />;
  }
};

export default LessonsList;
