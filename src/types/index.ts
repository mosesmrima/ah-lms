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

// User types
export * from './user';

// Course types
export * from './course';

// Event types
export * from './event';

// Enrollment types
export * from './enrollment';

// Common types
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
};

export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type SortOrder = 'asc' | 'desc';

export type PaginationParams = {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

// Firebase specific types
export type FirebaseTimestamp = {
  seconds: number;
  nanoseconds: number;
};

export type WithFirebaseTimestamps<T> = T & {
  createdAt: FirebaseTimestamp;
  updatedAt: FirebaseTimestamp;
};
