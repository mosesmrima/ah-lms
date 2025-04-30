"use client";

import { PageLayout } from "@/components/layout";
import {
  HeroSection,
  DealsSection,
  PopularCoursesSection,
  WhyChooseUsSection,
  FAQSection
} from "@/components/home";
import PageTransition from "@/components/animations/PageTransition";
import AnimateOnScroll from "@/components/animations/AnimateOnScroll";

export default function Home() {
  return (
    <PageTransition>
      <PageLayout>
        <HeroSection />
        <AnimateOnScroll direction="up" delay={0.2}>
          <DealsSection />
        </AnimateOnScroll>
        <AnimateOnScroll direction="up" delay={0.3}>
          <PopularCoursesSection />
        </AnimateOnScroll>
        <AnimateOnScroll direction="up" delay={0.4}>
          <WhyChooseUsSection />
        </AnimateOnScroll>
        <AnimateOnScroll direction="up" delay={0.5}>
          <FAQSection />
        </AnimateOnScroll>
      </PageLayout>
    </PageTransition>
  );
}
