import React from 'react';
import Image from 'next/image';
import { AcademicCapIcon, BookOpenIcon, GlobeAltIcon, CodeBracketIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid'; // XMarkIcon is the new Twitter icon in v2

interface Creator {
  name: string;
  image: string;
  role: string;
  bio: string;
  experience: string;
  expertise: string[];
  social: {
    linkedin: string;
    twitter: string;
    github: string;
  };
  stats: {
    students: number;
    courses: number;
    rating: number;
  };
}

const CrafterTab: React.FC = () => {
  const creator: Creator = {
    name: "Dr. Sarah Johnson",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
    role: "Senior Cybersecurity Expert & Educator",
    bio: "With over 12 years of experience in cybersecurity, Dr. Johnson has helped organizations worldwide strengthen their digital defenses. Her research on AI-powered threat detection has been published in leading tech journals. She's passionate about making cybersecurity accessible to everyone.",
    experience: "12+ years in cybersecurity consulting and education",
    expertise: [
      "Network Security",
      "Ethical Hacking",
      "Cloud Security",
      "Incident Response",
      "Security Architecture"
    ],
    social: {
      linkedin: "https://linkedin.com/in/sarahjohnson",
      twitter: "https://twitter.com/sarahjohnson",
      github: "https://github.com/sarahjohnson"
    },
    stats: {
      students: 25000,
      courses: 15,
      rating: 4.9
    }
  };

  return (
    <div className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Profile Section */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Profile Image */}
          <div className="md:w-1/3">
            <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: '3/4' }}>
              <Image 
                src={creator.image}
                alt={creator.name}
                fill={true}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                unoptimized={true}
                priority={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h1 className="text-2xl font-bold">{creator.name}</h1>
                <p className="text-red-400 font-medium">{creator.role}</p>
                <div className="flex gap-4 mt-4">
                  <a href={creator.social.linkedin} target="_blank" rel="noopener noreferrer" 
                     className="hover:text-red-400 transition-colors"
                     title="LinkedIn">
                    <UserGroupIcon className="h-5 w-5" />
                  </a>
                  <a href={creator.social.twitter} target="_blank" rel="noopener noreferrer"
                     className="hover:text-red-400 transition-colors">
                    <XMarkIcon className="h-5 w-5" />
                  </a>
                  <a href={creator.social.github} target="_blank" rel="noopener noreferrer"
                     className="hover:text-red-400 transition-colors">
                    <CodeBracketIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 text-center">
              <div className="bg-[#1E1E1E] p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-400">{creator.stats.students.toLocaleString()}+</div>
                <div className="text-sm text-gray-400">Students</div>
              </div>
              <div className="bg-[#1E1E1E] p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-400">{creator.stats.courses}</div>
                <div className="text-sm text-gray-400">Courses</div>
              </div>
              <div className="bg-[#1E1E1E] p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-400">{creator.stats.rating}</div>
                <div className="text-sm text-gray-400">Avg Rating</div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="md:w-2/3 space-y-8">
            {/* About Section */}
            <div className="bg-[#1E1E1E] rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AcademicCapIcon className="h-5 w-5 text-red-400" /> About Me
              </h2>
              <p className="text-gray-300 leading-relaxed">{creator.bio}</p>
              <p className="mt-4 text-gray-400">{creator.experience}</p>
            </div>

            {/* Expertise Section */}
            <div className="bg-[#1E1E1E] rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BookOpenIcon className="h-5 w-5 text-red-400" /> Areas of Expertise
              </h2>
              <div className="flex flex-wrap gap-3">
                {creator.expertise.map((skill, index) => (
                  <span key={index} className="px-4 py-2 bg-gray-800 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Recent Work */}
            <div className="bg-[#1E1E1E] rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <GlobeAltIcon className="h-5 w-5 text-red-400" /> Recent Work
              </h2>
              <div className="space-y-4">
                <div className="border-l-2 border-red-400 pl-4">
                  <h3 className="font-semibold">Lead Security Architect</h3>
                  <p className="text-gray-400 text-sm">TechSecure Inc. • 2020 - Present</p>
                  <p className="text-gray-300 mt-1">Leading a team of security experts to develop next-gen security solutions for enterprise clients.</p>
                </div>
                <div className="border-l-2 border-red-400 pl-4">
                  <h3 className="font-semibold">Cybersecurity Researcher</h3>
                  <p className="text-gray-400 text-sm">MIT Media Lab • 2016 - 2020</p>
                  <p className="text-gray-300 mt-1">Conducted groundbreaking research in AI-powered threat detection systems.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrafterTab;