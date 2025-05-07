import React, { useState } from 'react';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';

interface Student {
  id: string;
  name: string;
  avatarUrl: string;
}

interface StudentsSectionProps {
  students: Student[];
  selectedStudent?: Student;
}

const StudentsSection: React.FC<StudentsSectionProps> = ({ 
  students, 
  selectedStudent 
}) => {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSendMessage = () => {
    if (!message.trim() || !selectedStudent) return;
    console.log(`Sending message to ${selectedStudent.name}: ${message}`);
    setMessage('');
  };

  const handleSubmitRating = () => {
    if (!comment.trim()) return;
    console.log(`Submitting rating: ${rating} stars, comment: ${comment}`);
    setComment('');
  };

  return (
    <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#3D3D3D]">
      <h3 className="text-xl font-bold mb-4 text-white">Students taking the same course</h3>
      {/* Student Avatars */}
      <div className="flex space-x-2 mb-6">
        {students.map((student, index) => (
          <div
            key={student.id}
            className={`w-12 h-12 rounded-full overflow-hidden border-2 ${student.name === 'Alice Bee' ? 'border-[#E7343A]' : 'border-[#222]'} flex-shrink-0`}
            style={{ zIndex: students.length - index }}
          >
            <Image
              src={student.avatarUrl}
              alt={student.name}
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
        ))}
      </div>
      {/* Message Course Creator */}
      <div className="mb-6">
        <p className="text-base text-[#E7343A] mb-2 font-medium">Message the course creator</p>
        <div className="flex items-center border border-[#828282] rounded-lg px-3 py-2 bg-[#181818] mb-4">
          <input
            type="text"
            placeholder="Send the message"
            className="flex-1 bg-transparent text-gray-300 focus:outline-none placeholder-gray-500 text-base"
          />
          <button
            className="ml-2 flex items-center justify-center w-7 h-7 rounded-full bg-transparent hover:bg-[#222] transition"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.0703 8.51001L9.51026 4.23001C3.76026 1.35001 1.40026 3.71001 4.28026 9.46001L5.15026 11.2C5.40026 11.71 5.40026 12.3 5.15026 12.81L4.28026 14.54C1.40026 20.29 3.75026 22.65 9.51026 19.77L18.0703 15.49C21.9103 13.57 21.9103 10.43 18.0703 8.51001ZM14.8403 12.75H9.44026C9.03026 12.75 8.69026 12.41 8.69026 12C8.69026 11.59 9.03026 11.25 9.44026 11.25H14.8403C15.2503 11.25 15.5903 11.59 15.5903 12C15.5903 12.41 15.2503 12.75 14.8403 12.75Z" fill="#828282"/>
            </svg>
          </button>
        </div>
      </div>
      {/* Message Student */}
      {selectedStudent && (
        <div className="mb-6">
          <p className="text-base text-[#E7343A] mb-2 font-medium">Message {selectedStudent.name}</p>
          <div className="flex items-center border border-[#828282] rounded-lg px-3 py-2 bg-[#181818] mb-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Send the message"
              className="flex-1 bg-transparent text-gray-300 focus:outline-none placeholder-gray-500 text-base"
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 flex items-center justify-center w-7 h-7 rounded-full bg-transparent hover:bg-[#222] transition"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      )}
      {/* Rate Course */}
      <div>
        <p className="text-base text-[#E7343A] mb-2 font-medium">Rate this course material</p>
        <p className="text-xs text-gray-400 mb-2">Select Ratting Star value</p>
        <div className="flex space-x-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className={`h-6 w-6 cursor-pointer ${star <= rating ? 'text-[#E7343A]' : 'text-gray-400'}`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
        <div className="flex items-center border border-[#828282] rounded-lg px-3 py-2 bg-[#181818]">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Leave a comment" 
            className="flex-1 bg-[#111] text-white rounded-l-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#E7343A]"
          />
          <button 
            onClick={handleSubmitRating}
            className="bg-[#111] rounded-r-lg px-3 py-2 hover:bg-[#222] transition duration-300"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.0703 8.51001L9.51026 4.23001C3.76026 1.35001 1.40026 3.71001 4.28026 9.46001L5.15026 11.2C5.40026 11.71 5.40026 12.3 5.15026 12.81L4.28026 14.54C1.40026 20.29 3.75026 22.65 9.51026 19.77L18.0703 15.49C21.9103 13.57 21.9103 10.43 18.0703 8.51001ZM14.8403 12.75H9.44026C9.03026 12.75 8.69026 12.41 8.69026 12C8.69026 11.59 9.03026 11.25 9.44026 11.25H14.8403C15.2503 11.25 15.5903 11.59 15.5903 12C15.5903 12.41 15.2503 12.75 14.8403 12.75Z" fill="#828282"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentsSection;
