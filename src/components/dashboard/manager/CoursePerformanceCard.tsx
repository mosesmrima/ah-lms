'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

const pieChartData = [
  { name: 'Good', value: 40, color: '#FFA500' },      // Orange
  { name: 'Great', value: 10, color: '#FF8C00' },     // DarkOrange
  { name: 'Better', value: 20, color: '#FF7F50' },    // Coral
  { name: 'Best', value: 10, color: '#FF6347' },      // Tomato
  { name: 'Other', value: 20, color: '#FFFFFF' } // White segment as in image
];

const legendItems = [
  { label: '40% Good', color: '#FFA500' },
  { label: '10 Great', color: '#FF8C00' },
  { label: '20 Better', color: '#FF7F50' },
  { label: '10% Best', color: '#FF6347' },
  { label: '0% Bad', color: '#FFFFFF' } 
];

const CoursePerformanceCard: React.FC = () => {
  return (
    <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-md text-white">
      <h3 className="text-base font-semibold text-red-500 mb-4">
        Course performance percentage in students
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Donut Chart Container (Left Column) */}
        <div className="relative md:col-span-1 flex justify-center md:justify-start">
          <ResponsiveContainer width="100%" height={180} className="max-w-[180px] md:max-w-none">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                fill="#8884d8"
                paddingAngle={1}
                dataKey="value"
                labelLine={false}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color === '#FFFFFF' ? '#A0A0A0' : entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Textual Info Container (Middle/Right Columns) */}
        <div className="md:col-span-2 md:grid md:grid-cols-2 md:gap-x-6 h-full">
          {/* Legend Items */}
          <div className="flex flex-col justify-center h-full space-y-1">
            {legendItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 mb-1">
                <span style={{ backgroundColor: item.color }} className={`h-2.5 w-2.5 inline-block rounded-sm ${item.color === '#FFFFFF' ? 'border border-gray-400' : ''}`}></span>
                <span className="text-xs text-gray-300">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Performance Stats (NPS, CLTV, ARPU) */}
          <div className="text-xs space-y-1.5 flex flex-col justify-center h-full">
            <p className="text-gray-300">
              <span className="font-medium">Net promoter score (NPS):</span> 70
              <span className="text-gray-400 ml-1">(up from 65)</span>
            </p>
            <p className="text-gray-300">
              <span className="font-medium">Customer lifetime value (CLTV):</span> $600
              <span className="text-gray-400 ml-1">(up from $500)</span>
            </p>
            <p className="text-gray-300">
              <span className="font-medium">Average revenue per user (ARPU):</span> $50
              <span className="text-gray-400 ml-1">(steady)</span>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center text-xs text-gray-400 border-t border-gray-700 pt-3">
        <InformationCircleIcon className="h-4 w-4 mr-1.5 text-gray-500 flex-shrink-0" />
        Based on this the students are performing well in most of the courses.
      </div>
    </div>
  );
};

export default CoursePerformanceCard;
