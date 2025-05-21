import React from 'react';
import {
  UsersIcon,
  BookOpenIcon,
  BanknotesIcon,
  ChartPieIcon,
} from '@heroicons/react/24/outline';
import CoursePerformanceCard from '@/components/dashboard/manager/CoursePerformanceCard';
import ClickRateCard from '@/components/dashboard/manager/ClickRateCard';
import CalendarCard from '@/components/dashboard/manager/CalendarCard';
import UpcomingEventCard from '@/components/dashboard/manager/UpcomingEventCard';

export default function ManagerDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Manager Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Users */}
        <div className="bg-[#1a1a1a] p-6 rounded-lg flex items-center space-x-4">
          <div className="p-3 rounded-lg bg-black">
            <UsersIcon className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">Total Users</h3>
            <p className="text-2xl font-bold">1,234</p>
            <p className="text-green-400 text-sm mt-1">+12% from last month</p>
          </div>
        </div>
        
        {/* Active Courses */}
        <div className="bg-[#1a1a1a] p-6 rounded-lg flex items-center space-x-4">
          <div className="p-3 rounded-lg bg-black">
            <BookOpenIcon className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">Active Courses</h3>
            <p className="text-2xl font-bold">48</p>
            <p className="text-green-400 text-sm mt-1">+5 new this month</p>
          </div>
        </div>
        
        {/* Total Revenue */}
        <div className="bg-[#1a1a1a] p-6 rounded-lg flex items-center space-x-4">
          <div className="p-3 rounded-lg bg-black">
            <BanknotesIcon className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">Total Revenue</h3>
            <p className="text-2xl font-bold">$24,560</p>
            <p className="text-green-400 text-sm mt-1">+8.2% from last month</p>
          </div>
        </div>
        
        {/* Completion Rate */}
        <div className="bg-[#1a1a1a] p-6 rounded-lg flex items-center space-x-4">
          <div className="p-3 rounded-lg bg-black">
            <ChartPieIcon className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">Completion Rate</h3>
            <p className="text-2xl font-bold">78%</p>
            <p className="text-green-400 text-sm mt-1">+3% from last month</p>
          </div>
        </div>
      </div>
      
      {/* New Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left Column (Wider) */}
        <div className="lg:col-span-2 space-y-6 flex flex-col">
          <CoursePerformanceCard />
          <ClickRateCard />
        </div>
        {/* Right Column (Narrower) */}
        <div className="lg:col-span-1 space-y-6 flex flex-col">
          <CalendarCard />
          <UpcomingEventCard />
        </div>
      </div>
    </div>
  );
}
