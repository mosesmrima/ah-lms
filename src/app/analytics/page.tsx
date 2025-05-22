'use client';

import React from 'react';
import Link from 'next/link';
import StatCard from '@/components/analytics/StatCard';


const AnalyticsPage = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-0">Courses Analytics</h1>
        <Link 
          href="/manager-dashboard/my-courses" 
          className="bg-[#E7343A] hover:bg-red-700 text-white font-semibold py-2.5 px-6 rounded-lg text-sm sm:text-base"
        >
          Create Course
        </Link>
      </header>

      {/* Stats Grid */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            value="3,000" 
            label="Total User Logins"
            trend="up"
            trendValue="12%"
          />
          <StatCard 
            value="1h 25m" 
            label="Average Session Duration"
            trend="down"
            trendValue="5%"
          />
          <StatCard 
            value="10,000" 
            label="Total Course Interactions"
            trend="up"
            trendValue="24%"
          />
        </div>
      </div>

      {/* Additional analytics sections can be added here */}
    </div>
  );
};

export default AnalyticsPage;
