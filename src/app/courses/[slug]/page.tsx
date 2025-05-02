"use client";

import Image from "next/image";
import { useState } from "react";
import DashboardNavbar from "@/components/layout/DashboardNavbar";
import Footer from "@/components/layout/Footer";
import RelatedCoursesSection from "@/components/courses/RelatedCoursesSection";

// Mock data for the Data Security course
const courseData = {
  title: "Data Security",
  category: "Security > Cyber Security",
  description: "Modern life is becoming increasingly linked with data in clouds of experience in safeguarding industry-standard security tools. Mastering the fundamentals of data security is the key to understanding the techniques and skills needed to stay competitive and gain access to protect your data from breaches.",
  instructor: {
    name: "Madison Blue",
    image: "/images/instructor.jpg"
  },
  stats: {
    lectures: 37,
    quizzes: 40,
    duration: "English",
  },
  includes: [
    "10.5 hours on-demand video",
    "84 downloadable resources",
    "Full lifetime access",
    "Certificate of completion",
    "Access on mobile"
  ],
  requirements: [
    "Internet Connection: A stable internet connection is essential for accessing course materials, participating in online discussions, and completing assessments.",
    "Basic Computer Knowledge: Familiarity with computers, tablets, or smartphones with the capability to run the required course software and view course content.",
    "Web Browser: A modern web browser (e.g., Chrome, Firefox, Safari) is needed to access the course platform and view content.",
    "PDF Reader: For accessing course materials and documentation.",
    "Learning Management System (LMS): Access to the Learning Management System (LMS) where the course is hosted."
  ],
  description_full: "As an increasingly digitized world where data is a valuable asset, protecting sensitive information is paramount. This comprehensive Data Security course, taught by renowned data security expert Madison Blue, provides you with the knowledge and skills needed to effectively secure your company's most valuable assets.\n\nThe course begins with the fundamentals of data security, including confidentiality, integrity, and availability principles. You'll learn about threat assessment, risk management, and how to implement robust security controls. From there, you'll dive into practical applications, exploring real-world case studies and hands-on exercises.\n\nBy the end of this course, you'll have the skills to:\n- Identify potential vulnerabilities in your organization's data infrastructure\n- Implement effective security measures to protect sensitive information\n- Respond to security incidents quickly and effectively\n- Develop comprehensive data security policies\n- Stay up-to-date with emerging threats and countermeasures",
  highlights: [
    "Expert Instructor: Led by renowned cybersecurity expert Madison Blue, this course offers insights from a seasoned professional with over a decade of experience in the field. Madison's expertise and real-world insights will guide you through complex concepts with clarity.",
    "Fundamentals to Advanced: The course covers the fundamental principles of data security, including confidentiality, integrity, and availability, before progressing to advanced techniques and strategies.",
    "Practical Applications: Learn how to apply theoretical knowledge to real-world scenarios, with concrete examples and step-by-step demonstrations.",
    "How to Implement: Detailed guidance on implementing data security measures in various environments, from small businesses to enterprise-level organizations.",
    "Career Guidance: Tips about how to use your new skills to advance your career. You'll receive job-seeking advice, portfolio-building suggestions, and insights into industry trends.",
    "Industry Recognition: The skills and knowledge gained from this course align with industry standards and best practices, ensuring that your organization meets legal requirements and is ready to face security challenges.",
    "Hands-on Learning: Engage in practical exercises that allow you to apply your knowledge in real-world scenarios. Practice vulnerability assessments, security audits, and incident response to solidify your understanding.",
    "Networking Opportunities: Connect with fellow learners through discussion forums. Share experiences, ask questions, and showcase your achievements to potential employers or colleagues."
  ],
  relatedCourses: [
    {
      id: 1,
      title: "Data Security",
      instructor: "Madison Blue",
      image: "/images/data-security-1.jpg"
    },
    {
      id: 2,
      title: "Data Security",
      instructor: "Madison Blue",
      image: "/images/data-security-2.jpg"
    },
    {
      id: 3,
      title: "Data Security",
      instructor: "Madison Blue",
      image: "/images/data-security-3.jpg"
    },
    {
      id: 4,
      title: "Data Security",
      instructor: "Madison Blue",
      image: "/images/data-security-4.jpg"
    }
  ],
  whatYouWillLearn: [
    "Fundamentals of Data Security",
    "Threat Landscape Analysis",
    "Encryption and Data Protection",
    "Access Control and Identity Management",
    "Incident Response and Recovery",
    "Security Best Practices",
    "Compliance and Regulations",
    "Data Security in the Cloud",
    "Case Studies and Real-World Scenarios",
    "Hands-On Labs"
  ]
};

export default function CourseDetails() {
  // We'll use the params in the future when fetching course data
  // const { slug } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  
  // In a real app, you would fetch course data based on the slug
  // For now, we'll use our mock data
  const course = courseData;

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <DashboardNavbar user={{ name: "John Doe" }} />
      
      {/* Course Header */}
      <div className="bg-[#111] py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="text-sm breadcrumbs mb-2">
                <span className="text-gray-400">{course.category}</span>
              </div>
              <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
              <p className="text-gray-300 mb-6">{course.description}</p>
              
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <Image 
                    src={course.instructor.image || "https://via.placeholder.com/40"} 
                    alt={course.instructor.name}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="text-sm">by <span className="text-red-500 font-medium">{course.instructor.name}</span></p>
              </div>
              
              <div className="flex gap-4 text-sm text-gray-300 mb-6">
                <div>{course.stats.lectures} Lectures</div>
                <div>{course.stats.quizzes} Quizzes</div>
                <div>{course.stats.duration}</div>
              </div>
            </div>
            
            <div className="md:w-[350px] bg-[#1A1A1A] rounded-lg overflow-hidden">
              <div className="relative h-[200px]">
                <Image
                  src="/images/data-security-1.jpg"
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">This course includes:</h3>
                <ul className="space-y-2">
                  {course.includes.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded mt-6 transition-colors">
                  Enroll
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex border-b border-gray-700 mb-6">
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'curriculum' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400'}`}
            onClick={() => setActiveTab('curriculum')}
          >
            Curriculum
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'quiz' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400'}`}
            onClick={() => setActiveTab('quiz')}
          >
            Quiz
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'ratings' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400'}`}
            onClick={() => setActiveTab('ratings')}
          >
            Ratings
          </button>
        </div>
        
        {activeTab === 'overview' && (
          <div>
            <div className="bg-[#1A1A1A] rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">What you&apos;ll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.whatYouWillLearn.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Requirements</h2>
              <ul className="list-disc pl-5 space-y-2">
                {course.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <div className="whitespace-pre-line text-gray-300">
                {course.description_full}
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Course Highlights</h2>
              <div className="space-y-4">
                {course.highlights.map((highlight, index) => (
                  <div key={index} className="bg-[#1A1A1A] p-4 rounded">
                    <p>{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-black">
              <RelatedCoursesSection />
            </div>
          </div>
        )}
        
        {activeTab === 'curriculum' && (
          <div className="bg-[#1A1A1A] rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Course Curriculum</h2>
            <p className="text-gray-400">Curriculum content will be displayed here.</p>
          </div>
        )}
        
        {activeTab === 'quiz' && (
          <div className="bg-[#1A1A1A] rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Course Quizzes</h2>
            <p className="text-gray-400">Quiz content will be displayed here.</p>
          </div>
        )}
        
        {activeTab === 'ratings' && (
          <div className="bg-[#1A1A1A] rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Student Ratings</h2>
            <p className="text-gray-400">Ratings and reviews will be displayed here.</p>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
