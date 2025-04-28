"use client";

import { Navbar, Footer } from "@/components/layout";
import {
  HeroSection,
  DealsSection,
  PopularCoursesSection,
  WhyChooseUsSection,
  FAQSection
} from "@/components/home";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <DealsSection />
        <PopularCoursesSection />
        <WhyChooseUsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
