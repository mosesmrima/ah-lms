import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface StatCardProps {
  value: string | number;
  label: string;
  trend?: 'up' | 'down';
  trendValue?: string;
  insight?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  trend,
  trendValue,
  insight,
  className = '',
}) => {
  return (
    <div className={`bg-[#1a1a1a] p-6 rounded-lg ${className}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-3xl font-bold text-white">{value}</p>
          <p className="text-gray-400 text-sm mt-1">{label}</p>
        </div>
        {trend && (
          <div className={`flex items-center ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
            {trend === 'up' ? (
              <ArrowUpIcon className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 mr-1" />
            )}
            <span className="text-xs font-medium">{trendValue}</span>
          </div>
        )}
      </div>
      {insight && (
        <div className="mt-3 pt-3 border-t border-gray-700">
          <p className="text-xs text-gray-400">{insight}</p>
        </div>
      )}
    </div>
  );
};

export default StatCard;
