"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { LoginModal, SignUpModal } from "../auth";
import { useUserStore } from "@/store";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const { user } = useUserStore();
  const { logout } = useAuth();
  const router = useRouter();
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

  const handleLogout = async () => {
    try {
      await logout();
      setIsDropdownOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <nav className="w-full py-4 md:py-6 bg-black text-white sticky top-0 z-50">
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

          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/courses" 
              className="relative px-3 py-2 transition-colors hover:text-[#E7343A] active:scale-95 focus:outline-none rounded-md"
            >
              Courses
            </Link>
            <Link 
              href="/happenings" 
              className="relative px-3 py-2 transition-colors hover:text-[#E7343A] active:scale-95 focus:outline-none rounded-md"
            >
              Happenings
            </Link>
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <div 
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="text-sm font-medium">{user.name}</span>
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-600 flex items-center justify-center">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-sm font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Dropdown Menu */}
                <div 
                  className={`absolute right-0 mt-2 w-56 bg-black border border-[#4f4f4f] rounded-md shadow-lg z-50 transition-opacity duration-150 ${isDropdownOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                  <div className="p-2 space-y-1">
                    <Link 
                      href="/dashboard" 
                      className="flex items-center space-x-3 p-2 hover:bg-[#1a1a1a] rounded-md transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                      <span>Dashboard</span>
                    </Link>
                    <Link 
                      href="/profile" 
                      className="flex items-center space-x-3 p-2 hover:bg-[#1a1a1a] rounded-md transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      <span>Profile</span>
                    </Link>
                    <Link 
                      href="/manager-dashboard" 
                      className="flex items-center space-x-3 p-2 hover:bg-[#1a1a1a] rounded-md transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        <path d="M3 5a1 1 0 011-1h1v1a1 1 0 01-2 0V5z" />
                      </svg>
                      <span>Manager Dashboard</span>
                    </Link>
                    <Link 
                      href="/my-learnings" 
                      className="flex items-center space-x-3 p-2 hover:bg-[#1a1a1a] rounded-md transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.458 4.5 1.256V4.804z" />
                        <path d="M9 4.804A7.968 7.968 0 0114.5 4c1.255 0 2.443.29 3.5.804v10A7.969 7.969 0 0014.5 14c-1.669 0-3.218.458-4.5 1.256V4.804z" />
                      </svg>
                      <span>My Learnings</span>
                    </Link>
                    <div className="border-t border-[#4f4f4f] my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center space-x-3 p-2 hover:bg-[#1a1a1a] rounded-md transition-colors text-red-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                      </svg>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => setIsLoginModalOpen(true)} 
                  className="relative px-3 py-2 transition-colors hover:text-[#E7343A] active:scale-95 focus:outline-none rounded-md"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => setIsSignUpModalOpen(true)} 
                  className="relative px-3 py-2 transition-colors hover:text-[#E7343A] active:scale-95 focus:outline-none rounded-md"
                >
                  Sign Up
                </button>
              </>
            )}
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
              Courses
            </Link>
            <Link 
              href="/happenings" 
              className="relative px-3 py-2 transition-colors hover:text-[#E7343A] active:scale-95 focus:outline-none rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Happenings
            </Link>
            {user ? (
              <>
                <div className="border-t border-[#4f4f4f] my-1"></div>
                <Link 
                  href="/dashboard" 
                  className="flex items-center space-x-3 px-3 py-2 hover:bg-[#1a1a1a] rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <span>Dashboard</span>
                </Link>
                <Link 
                  href="/profile" 
                  className="flex items-center space-x-3 px-3 py-2 hover:bg-[#1a1a1a] rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span>Profile</span>
                </Link>
                <Link 
                  href="/my-learnings" 
                  className="flex items-center space-x-3 px-3 py-2 hover:bg-[#1a1a1a] rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.458 4.5 1.256V4.804z" />
                    <path d="M9 4.804A7.968 7.968 0 0114.5 4c1.255 0 2.443.29 3.5.804v10A7.969 7.969 0 0014.5 14c-1.669 0-3.218.458-4.5 1.256V4.804z" />
                  </svg>
                  <span>My Learnings</span>
                </Link>
                <div className="border-t border-[#4f4f4f] my-1"></div>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left flex items-center space-x-3 px-3 py-2 hover:bg-[#1a1a1a] rounded-md transition-colors text-red-400"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                  </svg>
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <button
                  className="text-left relative px-3 py-2 transition-colors hover:text-[#E7343A] active:scale-95 focus:outline-none rounded-md"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsLoginModalOpen(true);
                  }}
                >
                  Sign In
                </button>
                <button
                  className="text-left relative px-3 py-2 bg-[#E7343A] hover:bg-red-700 text-white active:scale-95 focus:outline-none rounded-md"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsSignUpModalOpen(true);
                  }}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onOpenSignUp={() => {
          setIsLoginModalOpen(false);
          setIsSignUpModalOpen(true);
        }} 
      />

      {/* Sign Up Modal */}
      <SignUpModal 
        isOpen={isSignUpModalOpen} 
        onClose={() => setIsSignUpModalOpen(false)} 
        onOpenLogin={() => {
          setIsSignUpModalOpen(false);
          setIsLoginModalOpen(true);
        }} 
      />
    </>
  );
};

export default Navbar;
