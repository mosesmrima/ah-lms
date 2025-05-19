import React, { useState } from 'react';
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
            <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
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

const CurriculumTab: React.FC = () => {
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
    <div className="py-6">
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
    </div>
  );
};

export default CurriculumTab;
