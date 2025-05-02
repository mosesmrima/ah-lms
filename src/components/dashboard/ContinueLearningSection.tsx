"use client";

import Image from "next/image";
import Link from "next/link";
import CalendarIcon from "../icons/CalendarIcon";

interface CourseCardProps {
  id: number;
  title: string;
  description?: string;
  courseCategory?: string;
  image?: string;
  lectureTime?: string;
}

const ScheduleCard = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="self-stretch h-56 px-6 py-16 bg-stone-900 rounded-xl outline outline-1 outline-offset-[-1px] outline-stone-900 inline-flex flex-col justify-center items-center gap-2.5">
      <div className="self-stretch inline-flex justify-start items-center gap-12">
        <div className="flex-shrink-0 mr-4">
          <CalendarIcon />
        </div>
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
          <div className="self-stretch justify-start text-white text-base font-bold font-['helvetica'] tracking-tight">{title}</div>
          <div className="self-stretch justify-start text-white text-xs font-normal font-['helvetica'] tracking-tight">{description}</div>
          <div className="self-stretch justify-start text-red-500 text-[10px] font-normal font-['helvetica'] tracking-tight">Get Started</div>
        </div>
      </div>
    </div>
  );
};

const CourseCard = ({ title, courseCategory, image, lectureTime }: CourseCardProps) => {
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
          <div className="w-48 h-[5px] bg-zinc-300 rounded-[5px]" />
          <div className="self-stretch justify-start text-stone-300 text-[10px] font-normal font-['helvetica'] tracking-tight">Lecture - {lectureTime} Minutes</div>
        </div>
      </div>
    </div>
  );
};

const ContinueLearningSection = () => {
  // Mock data for user's courses
  const userCourses = [
    {
      id: 1,
      title: "Schedule time to learn",
      description: "A little each day adds up. Get reminders from your calendar.",
    },
    {
      id: 2,
      title: "Password Management",
      courseCategory: "Cyber Security",
      image: "/images/data-security-2.jpg",
      lectureTime: "12"
    },
    {
      id: 3,
      title: "Data Management",
      courseCategory: "Data Security",
      image: "/images/data-security-3.jpg",
      lectureTime: "10"
    },
  ];

  return (
    <section className="px-4 sm:px-6 md:px-12 py-10 bg-black">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">Let&apos;s continue learning, Collins Kreation</h2>
          <Link href="/courses" className="text-sm text-red-500 hover:text-red-400 font-medium">
            My Course
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {userCourses.map((course) => (
            course.id === 1 ? (
              <ScheduleCard
                key={course.id}
                title={course.title}
                description={course.description || ""}
              />
            ) : (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                courseCategory={course.courseCategory}
                image={course.image}
                lectureTime={course.lectureTime}
              />
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContinueLearningSection;
