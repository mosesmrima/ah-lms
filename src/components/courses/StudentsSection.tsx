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
    <div className="bg-[#1A1A1A] rounded-lg p-4">
      <h3 className="text-xl font-bold mb-4 text-white">Students taking the same course</h3>
      
      {/* Student Avatars */}
      <div className="flex flex-wrap mb-4">
        {students.map((student, index) => (
          <div 
            key={student.id} 
            className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#222] -ml-2 first:ml-0"
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
      
      {/* Message Student */}
      {selectedStudent && (
        <div className="mb-6">
          <p className="text-sm text-[#E7343A] mb-2">Message {selectedStudent.name}</p>
          <div className="flex">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Send the message" 
              className="flex-1 bg-[#111] text-white rounded-l-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#E7343A]"
            />
            <button 
              onClick={handleSendMessage}
              className="bg-[#111] rounded-r-lg px-3 py-2 hover:bg-[#222] transition duration-300"
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
        <p className="text-sm text-[#E7343A] mb-2">Rate this course material</p>
        <p className="text-xs text-gray-400 mb-2">Select rating star value</p>
        <div className="flex mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon 
              key={star} 
              className={`h-5 w-5 cursor-pointer ${star <= rating ? 'text-[#E7343A]' : 'text-gray-400'}`} 
              onClick={() => setRating(star)}
            />
          ))}
        </div>
        <div className="flex">
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
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentsSection;
