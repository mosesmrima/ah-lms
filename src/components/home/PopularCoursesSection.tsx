"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CourseCard } from "@/components/courses";
import Link from "next/link";

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

const PopularCoursesSection = () => {
  const [activeFilter, setActiveFilter] = useState("web3");
  const filteredCourses = COURSES.filter(c => c.category === activeFilter);

  return (
    <section className="bg-black py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-0">My Library</h2>
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
          <Link href="/courses">
            <Button customVariant="secondary" className="px-4 sm:px-6 py-2 text-sm sm:text-base">View All Courses</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularCoursesSection;
