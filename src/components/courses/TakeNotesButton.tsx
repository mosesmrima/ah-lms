import React, { useState } from 'react';
import { PencilIcon, XMarkIcon } from '@heroicons/react/24/outline';

const TakeNotesButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNotes = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full">
      <button
        onClick={toggleNotes}
        className={`flex items-center ${isOpen ? 'text-[#E7343A] hover:text-[#d12e33]' : 'bg-[#E7343A] hover:bg-[#d12e33] text-white'} px-3 py-2 rounded-md transition duration-300`}
      >
        {isOpen ? (
          <>
            <XMarkIcon className="h-5 w-5 mr-2" />
            Hide Notes
          </>
        ) : (
          <>
            <PencilIcon className="h-5 w-5 mr-2" />
            Take Notes
          </>
        )}
      </button>
      
      {isOpen && (
        <div className="mt-4 bg-black rounded-lg border border-gray-800 overflow-hidden">
          <div className="p-4">
            <div className="mb-4">
              <input 
                type="text" 
                className="w-full bg-[#111] text-white border border-gray-700 rounded-md p-2 mb-4 focus:outline-none focus:ring-1 focus:ring-[#E7343A] text-sm" 
                defaultValue="Edit your notes at 04:35"
              />
              
              <div className="bg-[#111] rounded-lg p-4 border border-gray-700">
                <div className="text-[#E7343A] font-bold mb-1">02:22</div>
                <div className="text-white font-medium mb-1">Introduction to design for startups - Lesson 5: Creation an art-board.</div>
                <p className="text-gray-400 text-sm">
                  As well as designers I also had in mind all the people who project manage, own or develop digital products. I believe there is a lot of interesting materials that will help the whole business think differently about creating digital products.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TakeNotesButton;
