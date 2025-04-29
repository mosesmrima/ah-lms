"use client";
import { Button } from "@/components/ui";
import Image from "next/image";

const UserHeroSection = () => {
  return (
    <section className="bg-black text-white py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
        <div className="max-w-xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Welcome to your digital library
          </h1>
          <p className="text-gray-300 text-sm sm:text-base mb-6 sm:mb-8">
            Over 1000 high quality courses For you to learn. From your professionals in your industry.
          </p>
          <div className="flex flex-col sm:flex-row justify-start items-center gap-3 sm:gap-4 w-full">
            <Button customVariant="primary" className="w-full sm:flex-1">
              My Learnings
            </Button>
            <Button customVariant="secondary" className="w-full sm:flex-1">
              All Courses
            </Button>
          </div>
        </div>
        
        {/* Image container with animated gradient circles and floating effect */}
        <div className="flex justify-center items-center mt-6 md:mt-0">
          <div className="relative min-h-[300px] sm:min-h-[350px] md:min-h-[420px] flex justify-center items-center">
            
            {/* Medium circle 1 */}
            <div className="absolute w-[150px] h-[150px] top-[-30px] right-[40px] blur-xl opacity-80 z-0 pointer-events-none">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-500 to-red-600 animate-pulse" />
            </div>
            
            {/* Medium circle 2 */}
            <div className="absolute w-[170px] h-[170px] bottom-[30px] left-[20px] blur-xl opacity-80 z-0 pointer-events-none">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 to-red-500 animate-pulse" />
            </div>
            
            {/* Small circle 1 */}
            <div className="absolute w-[100px] h-[100px] top-[120px] right-[10px] blur-xl opacity-80 z-0 pointer-events-none">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-red-600 to-pink-400 animate-pulse" />
            </div>
            
            {/* Small circle 2 */}
            <div className="absolute w-[80px] h-[80px] bottom-[10px] right-[60px] blur-xl opacity-80 z-0 pointer-events-none">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-500 to-yellow-500 animate-pulse" />
            </div>
            
            {/* Main image with floating animation */}
            <div className="relative z-10 animate-float">
              <Image 
                src="/images/My Library.png" 
                alt="Digital library illustration"
                width={500}
                height={400}
                style={{ width: 'auto', height: 'auto' }}
                priority
                className="object-contain drop-shadow-2xl rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserHeroSection;
