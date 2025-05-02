"use client";

import { PageLayout } from "@/components/layout";
import Image from "next/image";

interface CourseCardProps {
  id: number;
  title: string;
  description?: string;
  courseCategory?: string;
  image?: string;
  lectureTime?: string;
  progress?: number;
}

const CourseCard = ({ title, courseCategory, image, lectureTime, progress }: CourseCardProps) => {
  return (
    <div className="self-stretch px-7 py-3.5 bg-stone-900 rounded-xl outline outline-1 outline-offset-[-1px] outline-stone-900 inline-flex flex-col justify-center items-center gap-2.5">
      <div className="self-stretch inline-flex justify-start items-center gap-7">
        <Image
          src={image || ""}
          alt={title}
          width={125}
          height={200}
          className="w-32 h-48 rounded-xl object-cover"
        />
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
          <div className="self-stretch justify-start text-white text-base font-bold font-['helvetica'] tracking-tight">{title}</div>
          <div className="self-stretch justify-start text-white text-xs font-normal font-['helvetica'] tracking-tight">Course: {courseCategory}</div>
          <div className="w-48 h-[5px] bg-zinc-800 rounded-[5px] overflow-hidden">
            {progress !== undefined && (
              <div 
                className="h-full bg-[#E7343A] rounded-[5px]" 
                style={{ width: `${progress}%` }}
              />
            )}
          </div>
          <div className="self-stretch flex justify-between items-center text-stone-300 text-[10px] font-normal font-['helvetica'] tracking-tight">
            <span>Lecture - {lectureTime} Minutes</span>
            {progress !== undefined && <span>{progress}% Complete</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MyLearnings() {
  const userCourses = [
    {
      id: 1,
      title: "People Management",
      courseCategory: "10. Communicating better with your team",
      image: "/images/data-security-1.jpg",
      lectureTime: "12",
      progress: 25,
    },
    {
      id: 2,
      title: "People Management",
      courseCategory: "10. Communicating better with your team",
      image: "/images/data-security-2.jpg",
      lectureTime: "12",
      progress: 40,
    },
    {
      id: 3,
      title: "People Management",
      courseCategory: "10. Communicating better with your team",
      image: "/images/data-security-3.jpg",
      lectureTime: "12",
      progress: 15,
    },
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">My Learning</h1>
          <p className="text-gray-400">These are the courses you have life time access to</p>
        </div>

        <div className="mb-8">
          <div className="flex space-x-4 mb-4">
            <button onClick={() => {}} className="text-[#E7343A] border-b-2 border-[#E7343A] pb-2">All Courses</button>
            <button onClick={() => {}} className="text-gray-400 pb-2">Wishlist</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {userCourses.map((course) => (
            <CourseCard
              key={course.id}
              {...course}
           />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
