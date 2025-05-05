import React, { useState } from 'react';
import { PencilIcon } from '@heroicons/react/24/outline';

interface TakeNotesButtonProps {
  courseId: string;
  lessonId: string;
}

const TakeNotesButton: React.FC<TakeNotesButtonProps> = ({ courseId, lessonId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState('');

  const handleSaveNote = () => {
    // Here you would implement the logic to save the note
    // For example, sending it to an API
    console.log('Saving note for course:', courseId, 'lesson:', lessonId, 'content:', note);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center bg-[#E7343A] hover:bg-[#d12e33] text-white px-3 py-2 rounded-md transition duration-300"
      >
        <PencilIcon className="h-5 w-5 mr-2" />
        Take Notes
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1A1A1A] rounded-lg w-full max-w-2xl p-6">
            <h3 className="text-xl font-bold mb-4 text-white">Take Notes</h3>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full h-64 bg-[#111] text-white rounded-lg p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-[#E7343A]"
              placeholder="Write your notes here..."
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-[#333] text-white rounded-md hover:bg-[#444] transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                className="px-4 py-2 bg-[#E7343A] text-white rounded-md hover:bg-[#d12e33] transition duration-300"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TakeNotesButton;
