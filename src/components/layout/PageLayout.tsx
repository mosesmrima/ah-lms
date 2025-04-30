"use client";

import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BackToTop } from "@/components/ui";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="h-8"></div>
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default PageLayout;
