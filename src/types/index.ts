// Common TypeScript interfaces for the Africa Tech LMS

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  discountPrice?: number;
  rating?: number;
  totalRatings?: number;
  imageUrl: string;
  category: string;
  tags?: string[];
  enrolledStudents?: number;
  lessons?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'student' | 'instructor' | 'admin';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  registrationUrl?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface NavigationLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
}
