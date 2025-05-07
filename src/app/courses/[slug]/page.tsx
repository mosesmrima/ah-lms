"use client";

import Image from "next/image";
import { useState } from "react";
import DashboardNavbar from "@/components/layout/DashboardNavbar";
import Footer from "@/components/layout/Footer";
import RelatedCoursesSection from "@/components/courses/RelatedCoursesSection";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import VideoPlayer from '@/components/courses/VideoPlayer';

// Mock data for the Data Security course
const courseData = {
  title: "Data Security",
  category: "Security > Cyber Security",
  description: "Modern life is becoming increasingly linked with data in clouds of experience in safeguarding industry-standard security tools. Mastering the fundamentals of data security is the key to understanding the techniques and skills needed to stay competitive and gain access to protect your data from breaches.",
  instructor: {
    name: "Madison Blue",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&w=160&h=160&fit=facearea&facepad=2.5"
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
      author: "Madison Blue",
      authorAvatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&w=160&h=160&fit=facearea&facepad=2.5",
      image: "/images/data-security-1.jpg"
    },
    {
      id: 2,
      title: "Data Security",
      author: "Madison Blue",
      authorAvatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&w=160&h=160&fit=facearea&facepad=2.5",
      image: "/images/data-security-2.jpg"
    },
    {
      id: 3,
      title: "Data Security",
      author: "Madison Blue",
      authorAvatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&w=160&h=160&fit=facearea&facepad=2.5",
      image: "/images/data-security-3.jpg"
    },
    {
      id: 4,
      title: "Data Security",
      author: "Madison Blue",
      authorAvatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&w=160&h=160&fit=facearea&facepad=2.5",
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


// Define types for curriculum data
interface Lecture {
  title: string;
  preview?: boolean;
  duration: string;
}

interface CurriculumSection {
  title: string;
  lectures: Lecture[];
  meta: string;
}

interface CurriculumAccordionProps {
  onSectionSelect: (index: number) => void;
  onLectureSelect: (sectionIndex: number, lectureIndex: number, title: string) => void;
}

function CurriculumAccordion({ onSectionSelect, onLectureSelect }: CurriculumAccordionProps) {
  const [openIndex, setOpenIndex] = useState(0);
  const [selectedLecture, setSelectedLecture] = useState({ sectionIndex: 0, lectureIndex: 0 });
  const curriculum = [
    {
      title: "Introduction",
      lectures: [
        { title: "Introduction", preview: true, duration: "3:43" },
        { title: "Designer Shortage", duration: "12:22" },
        { title: "Life Coaches in Design", duration: "10:12" },
        { title: "Make It Pretty", duration: "15:00" },
        { title: "Copy Inspirations", duration: "7:09" },
        { title: "Our First Design", duration: "10:01" },
        { title: "Summary", duration: "5:55" },
      ],
      meta: "7 Lectures • 86 Min",
    },
    {
      title: "What is Design",
      lectures: [],
      meta: "7 Lectures • 86 Min",
    },
    {
      title: "Design Process",
      lectures: [],
      meta: "7 Lectures • 86 Min",
    },
  ];

  return (
    <div className="space-y-3">
      {curriculum.map((section, idx) => (
        <div
          key={section.title}
          className={
            "bg-[#181818] border border-gray-700 rounded-xl" +
            (openIndex === idx ? "" : " overflow-hidden")
          }
        >
          <button
            className="w-full flex items-center justify-between px-5 py-4 text-left focus:outline-none"
            onClick={() => {
              const newIndex = openIndex === idx ? -1 : idx;
              setOpenIndex(newIndex);
              if (newIndex !== -1) {
                onSectionSelect(newIndex);
              }
            }}
          >
            <span className="font-semibold text-base flex-1">
              <span className="mr-2">
                {openIndex === idx ? (
                  <svg width="18" height="18" fill="none" stroke="currentColor" className="inline mr-1 text-gray-400" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                ) : (
                  <svg width="18" height="18" fill="none" stroke="currentColor" className="inline mr-1 text-gray-400" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                )}
                {section.title}
              </span>
            </span>
            <span className="text-sm text-gray-300 whitespace-nowrap">{section.meta}</span>
          </button>
          {openIndex === idx && section.lectures.length > 0 && (
            <div className="border-t border-gray-700 px-2 pb-3">
              {section.lectures.map((lecture, lidx) => (
                <div key={lecture.title}>
                  <div 
                    className={`flex items-center px-3 py-2 text-sm hover:bg-[#222] rounded transition ${selectedLecture.sectionIndex === idx && selectedLecture.lectureIndex === lidx ? 'bg-[#222] text-[#E7343A]' : 'text-gray-200'}`}
                    onClick={() => {
                      setSelectedLecture({ sectionIndex: idx, lectureIndex: lidx });
                      onLectureSelect(idx, lidx, lecture.title);
                    }}
                  >
                    {/* Play Icon */}
                    <svg className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><polygon points="7,5 15,10 7,15" /></svg>
                    <span className="flex-1">{lecture.title}</span>
                    {lecture.preview && <span className="text-xs text-[#E7343A] font-semibold mr-4">Preview</span>}
                    <span className="text-xs tabular-nums text-gray-400 w-12 text-right">{lecture.duration}</span>
                  </div>
                  {lidx !== section.lectures.length - 1 && <div className="border-b border-gray-700 mx-3" />}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

interface SectionSummaryProps {
  sectionIndex: number;
  lectureIndex: number;
  curriculum: CurriculumSection[];
}

function SectionSummary({ sectionIndex, lectureIndex, curriculum }: SectionSummaryProps) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  if (sectionIndex === -1 || !curriculum[sectionIndex]) {
    return (
      <div className="bg-[#181818] border border-gray-700 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Course Curriculum</h3>
        <p className="text-gray-300">Select a section to view its content.</p>
      </div>
    );
  }

  const section = curriculum[sectionIndex];
  const lecture = section.lectures[lectureIndex] || section.lectures[0];

  return (
    <div className="bg-[#181818] border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
      <h4 className="text-lg font-medium mb-3 text-[#E7343A]">{lecture.title}</h4>
      
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
          </svg>
          <span className="text-sm text-gray-300">{lecture.duration}</span>
        </div>
        
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
          </svg>
          <span className="text-sm text-gray-300">{section.meta}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <h5 className="font-medium mb-2">What you&apos;ll learn</h5>
        <ul className="space-y-2">
          <li className="flex items-start">
            <svg className="w-4 h-4 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-gray-300">Understanding {section.title.toLowerCase()} concepts</span>
          </li>
          <li className="flex items-start">
            <svg className="w-4 h-4 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-gray-300">Practical applications of {lecture.title.toLowerCase()}</span>
          </li>
        </ul>
      </div>
      
      {lecture.preview && (
        <button onClick={onOpen} className="flex items-center justify-center w-full bg-[#E7343A] hover:bg-red-700 text-white py-2 rounded transition-colors">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <polygon points="7,5 15,10 7,15" />
          </svg>
          Watch Preview
        </button>
      )}
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Video Preview</ModalHeader>
              <ModalBody>
                <VideoPlayer
                  videoUrl="https://player.vimeo.com/external/368320203.hd.mp4?s=ed0d9c488b69517bfb0e3992c94eb0cacb6a34a8&profile_id=175&oauth2_token_id=57447761"
                  thumbnailUrl="https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg"
                  duration="00:30"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

function CurriculumSection() {
  const [selectedSection, setSelectedSection] = useState(0);
  const [selectedLecture, setSelectedLecture] = useState(0);
  
  const curriculum = [
    {
      title: "Introduction",
      lectures: [
        { title: "Introduction", preview: true, duration: "3:43" },
        { title: "Designer Shortage", duration: "12:22" },
        { title: "Life Coaches in Design", duration: "10:12" },
        { title: "Make It Pretty", duration: "15:00" },
        { title: "Copy Inspirations", duration: "7:09" },
        { title: "Our First Design", duration: "10:01" },
        { title: "Summary", duration: "5:55" },
      ],
      meta: "7 Lectures • 86 Min",
    },
    {
      title: "What is Design",
      lectures: [
        { title: "Design Fundamentals", duration: "8:43" },
        { title: "Design Principles", duration: "14:22" },
        { title: "Visual Hierarchy", duration: "9:15" }
      ],
      meta: "3 Lectures • 32 Min",
    },
    {
      title: "Design Process",
      lectures: [
        { title: "Research Phase", duration: "11:20" },
        { title: "Wireframing", preview: true, duration: "15:45" },
        { title: "Prototyping", duration: "13:30" }
      ],
      meta: "3 Lectures • 40 Min",
    },
  ];
  
  const handleSectionSelect = (index: number) => {
    setSelectedSection(index);
    setSelectedLecture(0); // Reset to first lecture when changing sections
  };
  
  const handleLectureSelect = (sectionIndex: number, lectureIndex: number) => {
    setSelectedSection(sectionIndex);
    setSelectedLecture(lectureIndex);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Column - Summary */}
      <div>
        <SectionSummary 
          sectionIndex={selectedSection} 
          lectureIndex={selectedLecture} 
          curriculum={curriculum} 
        />
      </div>
      
      {/* Right Column - Curriculum Accordion */}
      <div>
        <CurriculumAccordion 
          onSectionSelect={handleSectionSelect}
          onLectureSelect={handleLectureSelect}
        />
      </div>
    </div>
  );
}

export default function CourseDetails() {
  // We'll use the params in the future when fetching course data
  // const { slug } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  
  // In a real app, you would fetch course data based on the slug
  // For now, we'll use our mock data
  const course = courseData;
  // Sample quizzes for the Course Quizzes tab
  const sampleQuizzes = [
    { id: 1, title: "Basics of Data Security", questions: 10 },
    { id: 2, title: "Encryption Techniques", questions: 8 },
    { id: 3, title: "Access Control Principles", questions: 12 },
    { id: 4, title: "Incident Response Scenarios", questions: 6 }
  ];
  // Sample ratings for the Student Ratings tab
  const sampleRatings = [
    {
      name: "Billy John",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&w=160&h=160&fit=facearea&facepad=2.5",
      rating: 5,
      review: "Explore a wealth of learning opportunities with our diverse selection of webinars, thought-provoking podcasts,",
    },
    {
      name: "Nelson Kim",
      avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&w=160&h=160&fit=facearea&facepad=2.5",
      rating: 4,
      review: "Explore a wealth of learning opportunities with our diverse selection of webinars, thought-provoking podcasts,",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <DashboardNavbar user={{ name: "John Doe" }} />
      
      {/* Course Header */}
      <div className="bg-[#111] py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
            <div className="flex-1 max-w-2xl mx-auto md:mx-0">
              <div className="text-sm breadcrumbs mb-2">
                <span className="text-gray-400">
                  Security <span className="mx-1">•</span> <span className="text-[#E7343A] font-bold">Cyber Security</span>
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
              <p className="text-gray-300 mb-6">{course.description}</p>
              
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <Image 
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=160" 
                    alt={course.instructor.name}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="text-sm">by <span className="text-[#E7343A] font-medium">{course.instructor.name}</span></p>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-6 items-center">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.478 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.478 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  {course.stats.lectures} Lectures
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {course.stats.quizzes} Quizzes
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  {course.stats.duration}
                </div>
              </div>
            </div>
            
            <div className="md:w-[350px] bg-[#1A1A1A] rounded-lg overflow-hidden">
              <div className="relative h-[200px] group cursor-pointer">
                <Image
                  src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&w=160&h=160&fit=facearea&facepad=2.5"
                  alt={course.title}
                  fill
                  className="object-cover"
                />
                {/* Always visible overlay with reduced opacity */}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="relative">
                    {/* Play button */}
                    <div className="w-16 h-16 rounded-full bg-[#E7343A] flex items-center justify-center z-10 relative">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                      </svg>
                    </div>
                    {/* Pulsating animation */}
                    <div className="absolute -inset-1 rounded-full bg-[#E7343A] animate-ping opacity-75"></div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">This course includes:</h3>
                <ul className="space-y-2">
                  {course.includes.map((item, index) => {
  let icon;
  if (item.toLowerCase().includes('video')) {
    icon = (
      <svg className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor"/><polygon points="10,9 16,12 10,15" fill="currentColor"/></svg>
    );
  } else if (item.toLowerCase().includes('resource')) {
    icon = (
      <svg className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16v16H4z" stroke="currentColor"/><path d="M8 4v16" stroke="currentColor"/><path d="M16 4v16" stroke="currentColor"/></svg>
    );
  } else if (item.toLowerCase().includes('lifetime')) {
    icon = (
      <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor"/><path d="M12 6v6l4 2" stroke="currentColor"/></svg>
    );
  } else if (item.toLowerCase().includes('certificate')) {
    icon = (
      <svg className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor"/><path d="M16 3v4M8 3v4" stroke="currentColor"/><circle cx="12" cy="14" r="2" fill="currentColor"/></svg>
    );
  } else if (item.toLowerCase().includes('mobile')) {
    icon = (
      <svg className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor"/><circle cx="12" cy="18" r="1" fill="currentColor"/></svg>
    );
  } else {
    icon = (
      <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor"/></svg>
    );
  }
  return (
    <li key={index} className="flex items-center gap-2 py-1">
      {icon}
      <span className="text-sm">{item}</span>
    </li>
  );
})}
                </ul>
                <button 
                  onClick={() => window.location.href = `${window.location.pathname}/watch`}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded mt-6 transition-colors"
                >
                  Enroll
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Content */}
      <div className="w-full mt-8 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-start gap-3 sm:gap-4 md:gap-5 pb-3 overflow-x-auto scrollbar-hide">
          <button 
            className={`rounded-full whitespace-nowrap px-3 py-1.5 text-sm sm:text-base font-bold transition-all border ${activeTab === 'overview' ? 'bg-[#222] border-red-500 text-red-500' : 'bg-transparent border-transparent text-white hover:text-red-500'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`rounded-full whitespace-nowrap px-3 py-1.5 text-sm sm:text-base font-bold transition-all border ${activeTab === 'curriculum' ? 'bg-[#222] border-red-500 text-red-500' : 'bg-transparent border-transparent text-white hover:text-red-500'}`}
            onClick={() => setActiveTab('curriculum')}
          >
            Curriculum
          </button>
          <button 
            className={`rounded-full whitespace-nowrap px-3 py-1.5 text-sm sm:text-base font-bold transition-all border ${activeTab === 'quiz' ? 'bg-[#222] border-red-500 text-red-500' : 'bg-transparent border-transparent text-white hover:text-red-500'}`}
            onClick={() => setActiveTab('quiz')}
          >
            Quiz
          </button>
          <button 
            className={`rounded-full whitespace-nowrap px-3 py-1.5 text-sm sm:text-base font-bold transition-all border ${activeTab === 'ratings' ? 'bg-[#222] border-red-500 text-red-500' : 'bg-transparent border-transparent text-white hover:text-red-500'}`}
            onClick={() => setActiveTab('ratings')}
          >
            Ratings
          </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div>
            <div className="bg-[#1A1A1A] rounded-lg p-6 my-8">
              <h2 className="text-xl font-semibold mb-4">What you&apos;ll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.whatYouWillLearn.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
          </div>
        )}
        
        {activeTab === 'curriculum' && (
          <div className="py-6">
            {/* Curriculum with Summary and Accordion */}
            <CurriculumSection />
          </div>
        )}
        
        {activeTab === 'quiz' && (
          <div className="bg-[#1A1A1A] rounded-lg p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Course Quizzes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleQuizzes.map((quiz) => (
                <div key={quiz.id} className="bg-[#222] p-4 rounded-lg flex flex-col justify-between">
                  <h3 className="text-lg font-semibold text-white mb-2">{quiz.title}</h3>
                  <p className="text-gray-400 mb-4">{quiz.questions} Questions</p>
                  <button
                    onClick={() => alert(`Starting quiz: ${quiz.title}`)}
                    className="mt-auto bg-red-600 hover:bg-red-700 text-white py-2 rounded transition"
                  >
                    Start Quiz
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'ratings' && (
          <div className="bg-[#1A1A1A] rounded-lg p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Student Ratings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sampleRatings.map((r, idx) => (
                <div key={idx} className="flex bg-[#232323] rounded-xl p-4 items-start">
                  <Image
                    src={r.avatar}
                    alt={`Avatar for ${r.name}`}
                    width={64}
                    height={64}
                    className="rounded-xl object-cover mr-4 border-2 border-red-600"
                    priority
                  />
                  <div>
                    <div className="font-bold text-white mb-1">{r.name}</div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${i < r.rating ? "text-red-500" : "text-gray-400"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.976c.3.921-.755 1.688-1.538 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.783.57-1.838-.197-1.538-1.118l1.287-3.976a1 1 0 00-.364-1.118L2.045 9.402c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.975z" />
                        </svg>
                      ))}
                    </div>
                    <div className="text-gray-200">{r.review}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Related Courses Section: always visible below tabs */}
        <div className="mt-16">
          <RelatedCoursesSection courses={course.relatedCourses} />
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}