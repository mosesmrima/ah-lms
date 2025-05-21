"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

interface DashboardNavbarProps {
  user: {
    name: string;
    image?: string;
  };
}

const DashboardNavbar = ({ user }: DashboardNavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <nav className="w-full h-16 py-4 md:py-0 bg-black text-white border-b border-[#4f4f4f] sticky top-0 z-50 flex items-center">
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 md:px-12">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center">
                <Image 
                  src="/images/IMG_0955-Photoroom%201.png" 
                  alt="Africa Tech"
                  width={150} 
                  height={150}
                  style={{ width: 'auto', height: 'auto', maxHeight: '50px' }}
                  className="w-auto h-auto max-h-[40px] md:max-h-[50px]"
                />
              </div>
            </Link>
          </div>

          {/* User Profile and Navigation Section */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/courses" 
              className="relative px-3 py-2 transition-colors hover:text-[#E7343A] active:scale-95 focus:outline-none rounded-md"
            >
              Categories
            </Link>
            <Link 
              href="/my-learnings" 
              className="relative px-3 py-2 transition-colors hover:text-[#E7343A] active:scale-95 focus:outline-none rounded-md"
            >
              My Learnings
            </Link>
            <div className="relative" ref={dropdownRef}>
              <div 
                className="flex items-center space-x-4 cursor-pointer" 
                onClick={toggleDropdown}
                onMouseEnter={() => setIsDropdownOpen(true)}
              >
                <span className="text-sm font-medium">{user.name}</span>
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-600">
                  <Image 
                    src={user.image || "/images/default-avatar.svg"}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* User Dropdown Menu */}
              <div 
                className={`absolute right-0 mt-2 w-64 bg-black border border-[#4f4f4f] rounded-md shadow-lg z-50 transition-opacity duration-150 ${isDropdownOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <div className="p-4 space-y-3">
                  <Link 
                    href="/profile" 
                    className="flex items-center space-x-3 p-2 hover:bg-[#1a1a1a] rounded-md transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <span>Your Profile</span>
                  </Link>
                  
                  <Link 
                    href="/learnings" 
                    className="flex items-center space-x-3 p-2 hover:bg-[#1a1a1a] rounded-md transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                    <span>Your Learnings</span>
                  </Link>
                  
                  <Link 
                    href="/wishlist" 
                    className="flex items-center space-x-3 p-2 hover:bg-[#1a1a1a] rounded-md transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    <span>Your Wishlist</span>
                  </Link>
                  
                  <Link 
                    href="/language" 
                    className="flex items-center space-x-3 p-2 hover:bg-[#1a1a1a] rounded-md transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd" />
                    </svg>
                    <span>Select Language</span>
                  </Link>
                  
                  <hr className="border-[#4f4f4f]" />
                  
                  <Link 
                    href="/logout" 
                    className="flex items-center space-x-3 p-2 hover:bg-[#1a1a1a] rounded-md transition-colors text-[#E7343A]"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zm7 2a1 1 0 00-1 1v1H5a1 1 0 100 2h4v1a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>Logout</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-[60px] sm:top-[68px] left-0 right-0 bg-black border-t border-[#333] p-4 z-40 shadow-lg">
          <div className="container mx-auto flex flex-col space-y-4">
            <Link 
              href="/courses" 
              className="relative px-3 py-2 transition-colors hover:text-[#E7343A] active:scale-95 focus:outline-none rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link 
              href="/dashboard" 
              className="relative px-3 py-2 transition-colors hover:text-[#E7343A] active:scale-95 focus:outline-none rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              My Learnings
            </Link>
            {/* Mobile User Profile */}
            <div className="flex items-center space-x-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-600">
                <Image 
                  src={user.image || "/images/default-avatar.svg"}
                  alt={user.name}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-medium">{user.name}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardNavbar;
