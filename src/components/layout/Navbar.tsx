"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LoginModal, SignUpModal } from "../auth";
import { useUserStore } from "@/store";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const { user } = useUserStore();
  console.log(user)
  const { logout } = useAuth();

  return (
    <>
      <nav className="w-full py-4 md:py-6 bg-black text-white border-b border-[#4f4f4f] sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 md:px-12">
          <div className="flex items-center space-x-4">
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
            {user && (
              <div className="hidden md:flex items-center space-x-2 text-sm">
                <span className="text-gray-300">{user.name}</span>
                <span className="text-gray-500">({user.email})</span>
              </div>
            )}
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
              <button 
                onClick={logout}
                className="relative px-3 py-2 transition-colors hover:text-[#E7343A] active:scale-95 focus:outline-none rounded-md"
              >
                Sign Out
              </button>
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
            {user && (
              <div className="px-3 py-2 text-sm border-b border-gray-700">
                <div className="text-gray-300">{user.name}</div>
                <div className="text-gray-500">{user.email}</div>
              </div>
            )}
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
              <button
                className="text-left relative px-3 py-2 transition-colors hover:text-[#E7343A] active:scale-95 focus:outline-none rounded-md"
                onClick={() => {
                  setIsMenuOpen(false);
                  logout();
                }}
              >
                Sign Out
              </button>
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
