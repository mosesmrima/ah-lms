import Link from 'next/link';
import {
  Squares2X2Icon,
  PlayCircleIcon,
  UsersIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, label, isActive }) => {
  return (
    <Link href={href} className="block">
      <div
        className={`py-3 cursor-pointer group hover:bg-neutral-700 transition-colors duration-200 relative ${
          isActive ? 'bg-neutral-700' : '' // Background handled here, text color below
        }`}
      >
        <div className={`flex items-center space-x-3 px-6 ${
          isActive ? 'text-red-500' : 'text-neutral-300 group-hover:text-white'
        }`}>
          <Icon className={`h-6 w-6 ${isActive ? 'text-red-500' : 'text-neutral-400 group-hover:text-white'}`} />
          <span className={`font-medium`}>{label}</span>
        </div>
        {isActive && <div className="absolute left-0 top-0 h-full w-1 bg-red-500"></div>}
      </div>
    </Link>
  );
};

interface SidebarProps {
  user: {
    name: string;
    initials: string; // e.g., 'KC'
  };
  activePage: 'dashboard' | 'my-courses' | 'happenings' | 'analytics';
}

const Sidebar: React.FC<SidebarProps> = ({ user, activePage }) => {
  const navItems = [
    { href: '/manager-dashboard', icon: Squares2X2Icon, label: 'Dashboard', id: 'dashboard' },
    { href: '/manager-dashboard/my-courses', icon: PlayCircleIcon, label: 'My Courses', id: 'my-courses' },
    { href: '/manager-dashboard/happenings', icon: UsersIcon, label: 'Academy Happenings', id: 'happenings' },
    { href: '/manager-dashboard/analytics', icon: ChartBarIcon, label: 'Analytics', id: 'analytics' },
  ];

  return (
    // Removed p-6 from here, space-y-8 controls spacing between profile and nav
    <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-neutral-900 text-white flex flex-col space-y-8 shadow-lg z-40">
      {/* Profile Section - Added px-6 and pt-6 for its own padding */}
      <div className="flex flex-col items-center text-center space-y-3 px-6 pt-6 border-b border-neutral-700 pb-8">
        <div className="w-24 h-24 rounded-full bg-neutral-700 flex items-center justify-center text-3xl font-semibold text-white mb-2">
          {user.initials}
        </div>
        <p className="text-sm text-neutral-400">Your Dashboard</p>
        <h2 className="text-xl font-bold text-white">{user.name}</h2>
        <Link href="/manager-dashboard/profile">
          <span className="text-sm text-red-500 hover:text-red-400 cursor-pointer">View Profile</span>
        </Link>
      </div>

      {/* Navigation Section */}
      <nav className="flex-grow">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id} className="relative">
              <NavItem
                href={item.href}
                icon={item.icon}
                label={item.label}
                isActive={activePage === item.id}
              />
            </li>
          ))}
        </ul>
      </nav>

      {/* Optional: Footer or Logout */}
      {/* <div className="mt-auto"> ... </div> */}
    </div>
  );
};

export default Sidebar;
