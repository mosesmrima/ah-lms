import React, { useState, useRef } from 'react';
import Image from 'next/image';

interface VideoPlayerProps {
  videoUrl?: string;
  thumbnailUrl: string;
  duration: string;
  currentTime?: string;

}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl = 'https://player.vimeo.com/external/368320203.hd.mp4?s=ed0d9c488b69517bfb0e3992c94eb0cacb6a34a8&profile_id=175&oauth2_token_id=57447761',
  thumbnailUrl,
  duration,
  currentTime = '00:00',

}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Toggle play/pause functionality
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative bg-[#111] rounded-lg overflow-hidden">
      <div className="aspect-video relative">
        {isPlaying ? (
          <video 
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-cover rounded-lg"
            controls={false}
            autoPlay
          />
        ) : (
          <Image 
            src={thumbnailUrl} 
            alt="Course video" 
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
            priority
          />
        )}
        
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <button 
              onClick={togglePlay}
              className="relative z-10"
            >
              <div className="w-16 h-16 rounded-full bg-[#E7343A] flex items-center justify-center z-10 relative">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <div className="absolute -inset-1 rounded-full bg-[#E7343A] animate-ping opacity-75"></div>
            </button>
          </div>
        )}
      </div>
      
      {/* Video Progress Bar */}
      <div className="h-1 bg-gray-700 relative">
        <div 
          className="absolute h-full bg-[#E7343A]" 
          style={{ width: `${(currentTime && duration) ? (parseInt(currentTime) / parseInt(duration) * 100) : 0}%` }}
        ></div>
      </div>
      
      {/* Video Controls */}
      <div className="bg-[#1A1A1A] p-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button className="text-white hover:text-[#E7343A] transition duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            className="text-white hover:text-[#E7343A] transition duration-300"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
        </div>
        
        <div className="text-white text-sm">{currentTime} / {duration}</div>
        
        <div className="flex items-center space-x-2">
          <button className="text-white hover:text-[#E7343A] transition duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 010-7.072m12.728 0l-3.536 3.536m-9.9-3.536l3.536 3.536" />
            </svg>
          </button>
          <button className="text-white hover:text-[#E7343A] transition duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
