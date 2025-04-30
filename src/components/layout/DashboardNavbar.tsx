"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface DashboardNavbarProps {
  user: {
    name: string;
    image?: string;
  };
}

const DashboardNavbar = ({ user }: DashboardNavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="w-full py-4 md:py-6 bg-black text-white border-b border-[#4f4f4f] sticky top-0 z-50">
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
            <div className="flex items-center space-x-4">
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
