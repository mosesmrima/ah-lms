"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@heroui/react";
import { LoginModal, SignUpModal } from "../auth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  return (
    <>
      <nav className="w-full py-6 bg-black text-white border-b border-[#4f4f4f]">
        <div className="container mx-auto flex items-center justify-between px-6 md:px-12">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center">
                <Image 
                  src="/images/IMG_0955-Photoroom%201.png" 
                  alt="Africa Tech"
                  width={150} 
                  height={150}
                  style={{ width: 'auto', height: 'auto' }}
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

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-black p-4 z-50">
              <div className="flex flex-col space-y-4">
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
                <Button 
                  variant="ghost" 
                  className="text-white active:scale-95 transition-transform focus:outline-none" 
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  Sign In
                </Button>
                <Button 
                  className="bg-[#E7343A] hover:bg-red-700 text-white active:scale-95 transition-transform focus:outline-none" 
                  onClick={() => setIsSignUpModalOpen(true)}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

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
