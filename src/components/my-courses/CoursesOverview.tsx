import React from 'react';
import StatCard from './StatCard';
import { BookOpenIcon, CheckBadgeIcon, ArchiveBoxXMarkIcon } from '@heroicons/react/24/solid';

const CoursesOverview: React.FC = () => {
  const stats = [
    {
      id: 1,
      icon: <BookOpenIcon />,
      count: 100,
      label: 'Courses Created',
      percentageChange: '+10 this month',
      percentageColor: 'text-green-400',
    },
    {
      id: 2,
      icon: <CheckBadgeIcon />,
      count: 80,
      label: 'Courses Completed',
      percentageChange: '+8% from last period',
      percentageColor: 'text-green-400',
    },
    {
      id: 3,
      icon: <ArchiveBoxXMarkIcon />,
      count: 20,
      label: 'Courses Never Completed',
      percentageChange: '-2% from last period',
      percentageColor: 'text-red-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {stats.map((stat) => (
        <StatCard
          key={stat.id}
          icon={stat.icon}
          count={stat.count}
          label={stat.label}
          percentageChange={stat.percentageChange}
          percentageColor={stat.percentageColor}
        />
      ))}
    </div>
  );
};

export default CoursesOverview;
