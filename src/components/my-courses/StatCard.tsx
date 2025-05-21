import React from 'react';

interface StatCardProps {
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  count: string | number;
  label: string;
  percentageChange?: string;
  percentageColor?: string; // e.g., 'text-green-400' or 'text-red-400'
}

const StatCard: React.FC<StatCardProps> = ({ icon, count, label, percentageChange, percentageColor }) => {
  return (
    <div className="bg-[#1a1a1a] p-6 rounded-lg flex items-center space-x-4">
      <div className="p-3 rounded-lg bg-black">
        {React.cloneElement(icon, { className: 'h-6 w-6 text-red-500' })}
      </div>
      <div>
        <h3 className="text-gray-400 text-sm font-medium mb-1">{label}</h3>
        <p className="text-2xl font-bold text-white">{count}</p>
        {percentageChange && (
          <p className={`${percentageColor || 'text-green-400'} text-sm mt-1`}>
            {percentageChange}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
