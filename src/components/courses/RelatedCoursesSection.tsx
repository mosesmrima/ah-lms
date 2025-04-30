"use client";
import { CourseCard } from "@/components/courses";

// Sample course data - in a real app, this would be passed as props
const COURSES = [
  {
    id: 1,
    title: "Data Security",
    image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "Madison Blue",
    authorAvatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "web3",
  },
  {
    id: 2,
    title: "Blockchain Fundamentals",
    image: "https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "John Smith",
    authorAvatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "blockchain",
  },
  {
    id: 3,
    title: "Cybersecurity Essentials",
    image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "Sarah Johnson",
    authorAvatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "cybersecurity",
  },
  {
    id: 4,
    title: "Financial Literacy",
    image: "https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "Michael Brown",
    authorAvatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "financial",
  }
];

const RelatedCoursesSection = () => {
  return (
    <section className="bg-black py-10 px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Related Courses</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {COURSES.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedCoursesSection;
