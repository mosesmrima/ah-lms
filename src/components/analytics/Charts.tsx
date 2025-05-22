'use client';

import React from 'react';
import {
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Sector,
  TooltipProps
} from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

// Data for the completion trend chart
const completionData = [
  { name: 'Jan', completion: 45 },
  { name: 'Feb', completion: 52 },
  { name: 'Mar', completion: 48 },
  { name: 'Apr', completion: 58 },
  { name: 'May', completion: 65 },
  { name: 'Jun', completion: 68 },
];

// Data for the user activity chart
const userActivityData = [
  { name: 'Mon', active: 980, new: 300 },
  { name: 'Tue', active: 1100, new: 350 },
  { name: 'Wed', active: 1245, new: 420 },
  { name: 'Thu', active: 1180, new: 380 },
  { name: 'Fri', active: 1320, new: 450 },
  { name: 'Sat', active: 1050, new: 280 },
  { name: 'Sun', active: 920, new: 210 },
];

// Custom tooltip for charts
interface CustomTooltipProps extends TooltipProps<ValueType, NameType> {
  active?: boolean;
  payload?: Array<{
    value: string | number;
    name: string;
    color?: string;
    payload: {
      name: string;
      completion: number;
    };
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 p-3 border border-gray-700 rounded-lg shadow-lg">
        <p className="text-sm text-gray-300">{label}</p>
        {payload.map((entry, index) => (
          <p 
            key={`tooltip-${index}`} 
            className="text-sm" 
            style={{ color: entry.color || '#fff' }}
          >
            {entry.name}: {entry.value}{entry.name === 'completion' ? '%' : ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const CompletionTrendChart = () => (
  <div className="w-full h-full -ml-2 -mr-1 -mt-2">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart 
        data={completionData} 
        margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#9CA3AF', fontSize: 10 }} 
          padding={{ left: 5, right: 5 }}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#9CA3AF', fontSize: 10 }}
          width={25}
          tickFormatter={(value) => `${value}%`}
          domain={[0, 100]}
          tickCount={6}
        />
        <Tooltip 
          content={<CustomTooltip />} 
          wrapperStyle={{ outline: 'none' }}
        />
        <Line 
          type="monotone" 
          dataKey="completion" 
          stroke="#E7343A" 
          strokeWidth={2}
          dot={{ fill: '#E7343A', strokeWidth: 2, r: 2.5 }}
          activeDot={{ r: 4, stroke: '#E7343A', strokeWidth: 2, fill: '#1a1a1a' }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export const UserActivityChart = () => (
  <ResponsiveContainer width="100%" height={192}>
    <AreaChart data={userActivityData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
      <defs>
        <linearGradient id="activeUsers" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#E7343A" stopOpacity={0.2}/>
          <stop offset="95%" stopColor="#E7343A" stopOpacity={0.0}/>
        </linearGradient>
        <linearGradient id="newUsers" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
      <XAxis 
        dataKey="name" 
        axisLine={false} 
        tickLine={false} 
        tick={{ fill: '#9CA3AF' }}
      />
      <YAxis 
        axisLine={false} 
        tickLine={false} 
        tick={{ fill: '#9CA3AF' }}
        width={30}
      />
      <Tooltip content={<CustomTooltip />} />
      <Area 
        type="monotone" 
        dataKey="active" 
        name="Active Users"
        stroke="#E7343A" 
        fillOpacity={1} 
        fill="url(#activeUsers)" 
        strokeWidth={2}
      />
      <Area 
        type="monotone" 
        dataKey="new" 
        name="New Users"
        stroke="#3B82F6" 
        fillOpacity={1} 
        fill="url(#newUsers)" 
        strokeWidth={2}
      />
    </AreaChart>
  </ResponsiveContainer>
);

interface PieData {
  name: string;
  value: number;
  color?: string;
}

// Type for the pie chart data
interface PieData {
  name: string;
  value: number;
  color?: string;
}

export const CourseDistributionChart = ({ 
  data 
}: { 
  data: PieData[] 
}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onPieEnter = (_: React.MouseEvent, index: number) => {
    setActiveIndex(index);
  };

  const renderActiveShape = ({
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent
  }: {
    cx: number;
    cy: number;
    innerRadius: number;
    outerRadius: number;
    startAngle: number;
    endAngle: number;
    fill: string;
    payload: PieData;
    percent: number;
  }) => {

    return (
      <g>
        <text x={cx} y={cy - 10} textAnchor="middle" fill="#fff" className="text-sm font-medium">
          {payload.name}
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill="#9CA3AF" className="text-xs">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 4}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          // @ts-expect-error - Recharts types are not perfectly aligned with their implementation
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
          onMouseEnter={onPieEnter}
        >
          {data.map((entry, index) => (
            <Sector
              key={`cell-${index}`}
              fill={entry.color}
              cx={0}
              cy={0}
              innerRadius={0}
              outerRadius={0}
              startAngle={0}
              endAngle={0}
            />
          ))}
        </Pie>
        <Tooltip 
          content={({ active, payload }) => {
            if (active && payload && payload.length && payload[0].payload) {
              const total = data.reduce((sum, item) => sum + (item?.value || 0), 0);
              const value = payload[0].value as number;
              const percentage = total > 0 ? (value / total) * 100 : 0;
              
              return (
                <div className="bg-gray-900 p-2 border border-gray-700 rounded text-xs">
                  <p className="text-white">{payload[0].name}</p>
                  <p className="text-gray-300">{value} users</p>
                  <p className="text-gray-400">
                    {percentage.toFixed(1)}%
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
