import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Category {
  id: string;
  name: string;
  count: number;
}

const categoriesData: Category[] = [
  { id: 'blockchain', name: 'Blockchain', count: 10 },
  { id: 'crypto', name: 'Crypto Currency', count: 10 },
  { id: 'cybersecurity', name: 'Cyber Security', count: 10 },
  { id: 'programming', name: 'Programming & Tech', count: 10 },
  { id: 'financial', name: 'Financial Education', count: 10 },
];

const CourseFilterSidebar: React.FC = () => {
  return (
    <aside className="bg-neutral-800 p-6 rounded-lg h-full flex flex-col">
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search Course"
          className="w-full bg-neutral-700 border border-neutral-600 text-white placeholder-neutral-400 text-sm rounded-lg p-3 pl-10 focus:ring-[#E7343A] focus:border-[#E7343A] outline-none"
        />
        <MagnifyingGlassIcon className="h-5 w-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
      </div>
      <div className="space-y-4 flex-1 overflow-y-auto">
        {categoriesData.map((category) => (
          <label key={category.id} className="flex items-center justify-between text-neutral-300 hover:text-white cursor-pointer">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-5 w-5 bg-neutral-700 border-neutral-600 rounded text-[#E7343A] focus:ring-0 focus:ring-offset-0 focus:ring-[#E7343A] mr-3 cursor-pointer"
              />
              <span>{category.name}</span>
            </div>
            <span className="text-sm text-neutral-400 bg-neutral-700 px-2 py-0.5 rounded-md">{category.count}</span>
          </label>
        ))}
      </div>
    </aside>
  );
};

export default CourseFilterSidebar;
