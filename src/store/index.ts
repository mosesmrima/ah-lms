import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createUserSlice, UserSlice } from './slices/userSlice';
import { createCourseSlice, CourseSlice } from './slices/courseSlice';
import { createEventSlice, EventSlice } from './slices/eventSlice';
import { createUISlice, UISlice } from './slices/uiSlice';

// Combine all slices
export type StoreState = UserSlice & CourseSlice & EventSlice & UISlice;

// Create the store
export const useStore = create<StoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...createUserSlice(...a),
        ...createCourseSlice(...a),
        ...createEventSlice(...a),
        ...createUISlice(...a),
      }),
      {
        name: 'app-storage',
        partialize: (state) => ({
          theme: state.theme,
          user: state.user,
        }),
      }
    )
  )
);

// Export hooks for each slice
export const useUserStore = () => useStore((state) => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated,
  setUser: state.setUser,
  setAuthenticated: state.setAuthenticated,
  logout: state.logout,
}));

export const useCourseStore = () => useStore((state) => ({
  courses: state.courses,
  currentCourse: state.currentCourse,
  enrolledCourses: state.enrolledCourses,
  isLoading: state.isLoading,
  setCourses: state.setCourses,
  setCurrentCourse: state.setCurrentCourse,
  setEnrolledCourses: state.setEnrolledCourses,
  setLoading: state.setLoading,
  getEnrolledCourseIds: state.getEnrolledCourseIds,
  getCourseProgress: state.getCourseProgress,
  getEnrolledCourse: state.getEnrolledCourse,
}));

export const useEventStore = () => useStore((state) => ({
  events: state.events,
  currentEvent: state.currentEvent,
  isLoading: state.isLoading,
  setEvents: state.setEvents,
  setCurrentEvent: state.setCurrentEvent,
  setLoading: state.setLoading,
  getUpcomingEvents: state.getUpcomingEvents,
  getPastEvents: state.getPastEvents,
}));

export const useUIStore = () => useStore((state) => ({
  theme: state.theme,
  sidebarOpen: state.sidebarOpen,
  isLoading: state.isLoading,
  setTheme: state.setTheme,
  setSidebarOpen: state.setSidebarOpen,
  setLoading: state.setLoading,
  toggleSidebar: state.toggleSidebar,
  toggleTheme: state.toggleTheme,
}));