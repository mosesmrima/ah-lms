'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/store';
import { auth } from '@/lib/firebase/config';
import dynamic from 'next/dynamic';
import type { User } from '@/types';
import Sidebar from '@/components/layout/Sidebar';

// Dynamically import DashboardNavbar to avoid SSR issues
const DashboardNavbar = dynamic(
  () => import('@/components/layout/DashboardNavbar'),
  { ssr: false }
);

export default function ManagerDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, setUser } = useUserStore();
  // Remove unused router since we're not using it yet
  // const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Wait for Firebase auth to initialize
        const currentUser = auth.currentUser;
        
        if (currentUser) {
          // User is signed in, update the store
          const userData: User = {
            id: currentUser.uid,
            name: currentUser.displayName || 'User',
            email: currentUser.email || '',
            role: 'admin', // Default role, update as needed
          };
          setUser(userData);
        } else {
          // No user is signed in
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [setUser]);

  const pathname = usePathname();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  // Determine activePage based on the current route
  const getActivePage = (): 'dashboard' | 'my-courses' | 'happenings' | 'analytics' => {
    if (pathname.includes('/my-courses')) return 'my-courses';
    if (pathname.includes('/happenings')) return 'happenings';
    if (pathname.includes('/analytics')) return 'analytics';
    return 'dashboard'; // Default to dashboard
  };
  
  const activePage = getActivePage();

  const userInitials = user?.name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase() || 'GU'; // GU for Guest User

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <DashboardNavbar user={user ? { 
        name: user.name, 
        image: user.avatar 
      } : { name: 'Guest User', image: undefined }} />
      <div className="flex flex-1">
        <Sidebar 
          user={{ name: user?.name || 'Guest User', initials: userInitials }} 
          activePage={activePage} 
        />
        <main className="flex-1 p-6 ml-64">
          {children}
        </main>
      </div>
    </div>
  );
}
