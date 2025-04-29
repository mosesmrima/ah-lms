"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

const FILTERS = [
  { label: "Web3", value: "web3" },
  { label: "Blockchain", value: "blockchain" },
  { label: "Cybersecurity", value: "cybersecurity" },
  { label: "Financial Literacy", value: "financial" },
];

const COURSES = [
  {
    id: 1,
    title: "Data Security",
    image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "Madison Blue",
    authorAvatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "web3",
  },
  // ...repeat for demo purposes
];
while (COURSES.length < 8) {
  COURSES.push({ ...COURSES[0], id: COURSES.length + 1 });
}
type CourseCardProps = {
	title: string;
	image: string;
	author: string;
	authorAvatar: string;
};
function CourseCard({ title, image, author, authorAvatar }: CourseCardProps) {
  return (
    <div className="group relative bg-[#1E1E1E] rounded-xl border-2 border-transparent overflow-hidden transition hover:shadow-lg hover:border-red-600 min-h-[320px] sm:min-h-[350px] md:min-h-[400px] flex flex-col justify-end">
      {/* Image fills the card */}
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
      />
      {/* Gradient overlay with content */}
      <div className="absolute bottom-0 left-0 w-full pt-12 sm:pt-16 pb-4 sm:pb-6 px-3 sm:px-5 bg-gradient-to-t from-red-700/90 to-[#1E1E1E]/80 flex flex-col justify-end">
        <h3 className="font-bold text-lg sm:text-xl md:text-2xl text-white mb-2 text-center drop-shadow">{title}</h3>
        <div className="flex items-center justify-center mb-3 sm:mb-4">
          <Image src={authorAvatar} alt={author} width={40} height={40} className="rounded-full aspect-square object-cover w-8 h-8 sm:w-10 sm:h-10 mr-2" />
          <span className="text-sm sm:text-base text-white">by <span className="text-red-300">{author}</span></span>
        </div>
        <Button customVariant="primary" className="w-full text-sm sm:text-base md:text-lg py-2 sm:py-3 mt-2">Start Learning</Button>
      </div>
    </div>
  );
}

const PopularCoursesSection = () => {
  const [activeFilter, setActiveFilter] = useState("web3");
  const filteredCourses = COURSES.filter(c => c.category === activeFilter);

  return (
    <section className="bg-black py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-0">Popular Courses</h2>
          <div className="flex flex-wrap justify-start md:justify-end gap-2 sm:gap-3 md:gap-4 mt-2 md:mt-0 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {FILTERS.map((f) => (
              <Button
                key={f.value}
                customVariant="filter"
                size="sm"
                className={`rounded-full whitespace-nowrap px-3 py-1.5 text-sm sm:text-base ${activeFilter === f.value ? "bg-[#222] border-red-600 text-red-500" : "bg-transparent border-transparent text-white hover:text-red-500"}`}
                onClick={() => setActiveFilter(f.value)}
              >
                {f.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
        <div className="flex justify-center mt-8 sm:mt-10">
          <a href="/courses">
            <Button customVariant="secondary" className="px-4 sm:px-6 py-2 text-sm sm:text-base">View All Courses</Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PopularCoursesSection;
