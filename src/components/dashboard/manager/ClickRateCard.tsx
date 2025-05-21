'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const chartData = [
  { name: 'Monday', rate: 48 },
  { name: 'Tuesday', rate: 55 },
  { name: 'Wednesday', rate: 82 },
  { name: 'Thursday', rate: 61 },
  { name: 'Friday', rate: 90 },
  { name: 'Saturday', rate: 75 },
  { name: 'Sunday', rate: 30 },
];

const ClickRateCard: React.FC = () => {
  return (
    <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-md text-white">
      <h3 className="text-base font-semibold text-red-500 mb-4">
        Click Rate Of New Added Course Performance Over The Week
      </h3>
      <div className="h-64 md:h-72"> 
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 5, 
              left: -20, 
              bottom: 5,
            }}
            barCategoryGap="25%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={{ stroke: '#4B5563' }} tickLine={{ stroke: '#4B5563' }} dy={5} />
            <YAxis 
              tickFormatter={(value: number) => `${value}%`} 
              tick={{ fontSize: 11, fill: '#9CA3AF' }} 
              axisLine={{ stroke: '#4B5563' }} 
              tickLine={{ stroke: '#4B5563' }}
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              dx={-5}
            />
            <Tooltip
              cursor={{ fill: 'rgba(75, 85, 99, 0.3)' }}
              contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '0.375rem' }}
              labelStyle={{ color: '#F3F4F6', fontWeight: 'bold' }}
              itemStyle={{ color: '#D1D5DB' }}
              formatter={(value: string | number | (string | number)[]) => [`${value}%`, 'Click Rate']}
            />
            <Bar dataKey="rate" radius={[3, 3, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#3B82F6" /> 
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ClickRateCard;
