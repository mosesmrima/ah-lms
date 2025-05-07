import { StateCreator } from 'zustand';
import type { Course, Enrollment } from '@/types';

export interface CourseSlice {
  // Course state
  courses: Course[];
  currentCourse: Course | null;
  enrolledCourses: Enrollment[];
  isLoading: boolean;
  
  // Course actions
  setCourses: (courses: Course[]) => void;
  setCurrentCourse: (course: Course | null) => void;
  setEnrolledCourses: (enrollments: Enrollment[]) => void;
  setLoading: (isLoading: boolean) => void;
  
  // Course computed values
  getEnrolledCourseIds: () => string[];
  getCourseProgress: (courseId: string) => number;
  getEnrolledCourse: (courseId: string) => Course | undefined;
}

export const createCourseSlice: StateCreator<CourseSlice> = (set, get) => ({
  // Initial state
  courses: [],
  currentCourse: null,
  enrolledCourses: [],
  isLoading: false,
  
  // Actions
  setCourses: (courses) => set({ courses }),
  setCurrentCourse: (currentCourse) => set({ currentCourse }),
  setEnrolledCourses: (enrolledCourses) => set({ enrolledCourses }),
  setLoading: (isLoading) => set({ isLoading }),
  
  // Computed values
  getEnrolledCourseIds: () => {
    const { enrolledCourses } = get();
    return enrolledCourses.map(enrollment => enrollment.courseId);
  },
  
  getCourseProgress: (courseId: string) => {
    const { enrolledCourses } = get();
    const enrollment = enrolledCourses.find(e => e.courseId === courseId);
    return enrollment?.progress.percentage || 0;
  },
  
  getEnrolledCourse: (courseId: string) => {
    const { courses } = get();
    return courses.find(course => course.id === courseId);
  },
}); 