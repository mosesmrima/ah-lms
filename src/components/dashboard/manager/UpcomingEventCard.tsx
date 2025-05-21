import React from 'react';
import { VideoCameraIcon } from '@heroicons/react/24/solid';

const UpcomingEventCard: React.FC = () => {
  return (
    <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-md text-white h-full">
      <h3 className="text-base font-semibold mb-4">Upcoming Event</h3>
      <div className="bg-[#2A2A2A] p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="w-16 h-16 bg-gray-700 rounded-md flex-shrink-0 mt-1">
            {/* Placeholder for event image */}
          </div>
          <div className='flex-grow'>
            <h4 className="font-semibold text-sm mb-0.5">Web3 Innovators Summit</h4>
            <div className="flex items-center text-xs text-red-500 mb-1.5">
              <VideoCameraIcon className="h-3.5 w-3.5 mr-1" />
              <span>Virtual Conference</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-300 mt-2 leading-relaxed">
          Join us for the Web3 Innovators Summit, a groundbreaking virtual conference dedicated to
          exploring the latest developments in blockchain, decentralized finance (DeFi), and the future of the
          internet...
        </p>
        <div className="flex flex-col sm:flex-row sm:justify-between text-xs text-gray-400 mt-3 pt-2.5 border-t border-gray-700 space-y-1 sm:space-y-0">
          <span>Date : <span className="text-red-500">Sep 30, 2023</span></span>
          <span>Time : <span className="text-red-500">9:00 AM - 4:30 PM</span></span>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEventCard;
