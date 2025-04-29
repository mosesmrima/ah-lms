"use client";

import { Navbar, Footer } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { PopularCoursesSection } from "@/components/home";
import { UserHeroSection, ContinueLearningSection } from "@/components/dashboard";
import { PulsingPlayButton } from "@/components/ui/PulsingPlayButton";
import PageTransition from "@/components/animations/PageTransition";
import AnimateOnScroll from "@/components/animations/AnimateOnScroll";
import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
  // Mock data for user's courses
  const userCourses = [
    {
      id: 1,
      title: "Schedule time to learn",
      description: "Set aside dedicated time for your courses",
      image: "/images/data-security-1.jpg",
      instructor: "Collins Kreation",
      progress: 25,
    },
    {
      id: 2,
      title: "Password Management",
      description: "Learn how to secure your accounts",
      image: "/images/data-security-2.jpg",
      instructor: "Collins Kreation",
      progress: 40,
    },
    {
      id: 3,
      title: "Data Management",
      description: "Master data organization techniques",
      image: "/images/data-security-3.jpg",
      instructor: "Collins Kreation",
      progress: 15,
    },
  ];

  // Mock data for recommended course
  const recommendedCourse = {
    title: "Introduction to money and how to manage it.",
    instructor: "Collins Kreation",
    description: "Instructed by award winning expert banker",
    lectures: 20,
    level: "All Level",
    image: "/images/money-management.jpg"
  };


  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
        <Navbar />
        <main>
          <UserHeroSection />
          
          {/* User's current courses section */}
          <ContinueLearningSection />
          
          {/* What to learn next section */}
          <section className="px-4 sm:px-6 md:px-12 py-10 bg-black">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold font-helvetica tracking-tight text-white">What to learn next</h2>
                <p className="text-xl font-normal font-helvetica tracking-tight text-white">Our top recommendation for you</p>
              </div>
              
              <div className="flex items-center gap-16">
                <div className="relative w-[704px] h-96 rounded-xl border-2 border-red-500 overflow-hidden group cursor-pointer">
                  <Image 
                    src={recommendedCourse.image}
                    alt={recommendedCourse.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 704px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <PulsingPlayButton />
                  </div>
                </div>
                
                <div className="flex flex-col gap-6 flex-1">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-5xl font-bold font-helvetica leading-10 text-zinc-100">{recommendedCourse.title}</h3>
                      <p className="text-xl font-normal font-helvetica leading-7 text-zinc-100">{recommendedCourse.description}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-base font-normal font-satoshi leading-snug text-zinc-100">
                        By <span className="text-red-500 font-bold">{recommendedCourse.instructor}</span>
                      </p>
                      <p className="text-base font-normal font-satoshi leading-snug text-zinc-100">
                        {recommendedCourse.lectures} Lectures - {recommendedCourse.level}
                      </p>
                    </div>
                  </div>
                  <Button customVariant="primary" size="xl" fullWidth>
                    Start Now!
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* My Library Section */}
          <div className="w-full">
            <PopularCoursesSection />
          </div>
        </main>
        <Footer />
      </div>
  );
}
