'use client';

import React from 'react';
import Link from 'next/link';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import StatCard from '@/components/analytics/StatCard';
import { CompletionTrendChart, UserActivityChart, CourseDistributionChart } from '@/components/analytics/Charts';

const AnalyticsPage = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-[#1a1a1a]">
              <ChartBarIcon className="h-6 w-6 text-[#E7343A]" />
            </div>
            <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
          </div>
          <Link 
            href="/manager-dashboard/my-courses" 
            className="bg-[#E7343A] hover:bg-[#d62e33] text-white font-semibold py-2.5 px-6 rounded-lg text-sm sm:text-base transition-colors duration-200"
          >
            Create Course
          </Link>
        </div>
        <p className="mt-2 text-gray-400 text-sm">Track and analyze your learning metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-6">Key Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            value="3,000" 
            label="Total User Logins"
            trend="up"
            trendValue="12%"
            insight="Peak logins at 10 AM, 12% higher than last month"
            className="border-l-2 border-green-500"
          />
          <StatCard 
            value="1h 25m" 
            label="Avg. Session Duration"
            trend="down"
            trendValue="5%"
            className="border-l-2 border-red-500"
            insight="5% decrease from last month. Try adding interactive content"
          />
          <StatCard 
            value="10,000" 
            label="Course Interactions"
            trend="up"
            trendValue="24%"
            insight="24% growth. Top course: Cybersecurity Fundamentals"
            className="border-l-2 border-green-500"
          />
        </div>
      </div>

      {/* Course Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2 bg-[#1a1a1a] rounded-xl p-6 overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Course Completion Rates</h3>
            <select className="bg-[#222] text-gray-300 text-sm rounded-lg px-3 py-1.5 border border-gray-700 focus:ring-2 focus:ring-[#E7343A] focus:border-transparent">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="flex flex-col justify-between">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <StatCard 
                value="68%" 
                label="Avg. Completion"
                trend="up"
                trendValue="12%"
                insight="Above platform average of 62%"
                className="bg-[#222] p-4 h-full border-l-2 border-green-500"
              />
              <StatCard 
                value="4.2h" 
                label="Avg. Time to Complete"
                trend="down"
                trendValue="16%"
                insight="Shorter courses show 30% better completion"
                className="bg-[#222] p-4 h-full border-l-2 border-red-500"
              />
              <StatCard 
                value="1,245" 
                label="Certificates Issued"
                trend="up"
                trendValue="23%"
                insight="85% of completed courses claim certificates"
                className="bg-[#222] p-4 h-full border-l-2 border-green-500"
              />
            </div>
            <div className="mt-2">
              <div className="bg-[#222] p-4 rounded-lg overflow-hidden">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Course Completion Rates</h4>
                <div className="h-32 w-full">
                  <CompletionTrendChart />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-[#1a1a1a] rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Top Performing Courses</h3>
          <div className="space-y-4">
            {[
              { name: 'Cybersecurity Fundamentals', completion: 89, students: 1.2, trend: 'up' },
              { name: 'Cloud Architecture', completion: 78, students: 0.9, trend: 'up' },
              { name: 'Python for Beginners', completion: 72, students: 2.1, trend: 'down' },
              { name: 'Data Science Essentials', completion: 65, students: 0.8, trend: 'up' },
              { name: 'Blockchain Basics', completion: 58, students: 0.5, trend: 'down' },
            ].map((course, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="w-3/4">
                  <p className="text-sm font-medium text-white truncate">{course.name}</p>
                  <div className="flex items-center text-xs text-gray-400">
                    <span>{course.completion}% completion</span>
                    <span className="mx-2">•</span>
                    <span>{course.students}k students</span>
                  </div>
                </div>
                <div className={`flex items-center text-xs ${course.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {course.trend === 'up' ? (
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                    </svg>
                  )}
                  {course.trend === 'up' ? '12%' : '5%'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Activity & Engagement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-[#1a1a1a] rounded-xl p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">User Engagement</h3>
            <span className="text-sm text-green-400">+15% from last month</span>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-[#222] p-3 rounded-lg">
              <p className="text-gray-400 text-xs">Daily Active Users</p>
              <p className="text-xl font-bold text-white">1,245</p>
            </div>
            <div className="bg-[#222] p-3 rounded-lg">
              <p className="text-gray-400 text-xs">Avg. Session</p>
              <p className="text-xl font-bold text-white">12m 34s</p>
            </div>
            <div className="bg-[#222] p-3 rounded-lg">
              <p className="text-gray-400 text-xs">Returning Users</p>
              <p className="text-xl font-bold text-white">78%</p>
            </div>
          </div>
          <div className="flex-1 min-h-[180px]">
            <UserActivityChart />
          </div>
        </div>
        
        <div className="bg-[#1a1a1a] rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Learning Path Progress</h3>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="h-[180px] -mt-2 -mx-2">
              <CourseDistributionChart 
                data={[
                  { name: 'Cybersecurity', value: 450 },
                  { name: 'Cloud', value: 320 },
                  { name: 'Data Science', value: 280 },
                  { name: 'Web Dev', value: 190 },
                  { name: 'Other', value: 110 },
                ]} 
              />
            </div>
            <div className="mt-4 space-y-3">
              {[
                { name: 'Cybersecurity Track', progress: 65, users: 450, color: '#E7343A' },
                { name: 'Cloud Engineering', progress: 42, users: 320, color: '#3B82F6' },
                { name: 'Data Science', progress: 38, users: 280, color: '#10B981' },
                { name: 'Web Development', progress: 55, users: 190, color: '#F59E0B' },
              ].map((track, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{track.name}</span>
                    <span className="text-gray-400">{track.users} users</span>
                  </div>
                  <div className="w-full bg-[#222] rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full" 
                      style={{ 
                        width: `${track.progress}%`,
                        backgroundColor: track.color,
                        boxShadow: `0 0 8px ${track.color}80`
                      }}
                    />
                  </div>
                  <div className="text-right mt-1">
                    <span className="text-xs text-gray-400">{track.progress}% completed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
