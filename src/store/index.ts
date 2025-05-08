import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createUserSlice, UserSlice } from './slices/userSlice';
import { createCourseSlice, CourseSlice } from './slices/courseSlice';
import { createEventSlice, EventSlice } from './slices/eventSlice';
import { createUISlice, UISlice } from './slices/uiSlice';


// Combine all slices
export type StoreState = UserSlice & CourseSlice & EventSlice & UISlice;

// Create the store
const store = create<StoreState>()(
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
export const useUserStore = () => {
  const user = store((state) => state.user);
  const isAuthenticated = store((state) => state.isAuthenticated);
  const setUser = store((state) => state.setUser);
  const logout = store((state) => state.logout);

  return {
    user,
    isAuthenticated,
    setUser,
    logout,
  };
};

export const useCourseStore = () => {
  const courses = store((state) => state.courses);
  const currentCourse = store((state) => state.currentCourse);
  const enrolledCourses = store((state) => state.enrolledCourses);
  const isLoading = store((state) => state.isLoading);
  const setCourses = store((state) => state.setCourses);
  const setCurrentCourse = store((state) => state.setCurrentCourse);
  const setEnrolledCourses = store((state) => state.setEnrolledCourses);
  const setLoading = store((state) => state.setLoading);
  const getEnrolledCourseIds = store((state) => state.getEnrolledCourseIds);
  const getCourseProgress = store((state) => state.getCourseProgress);
  const getEnrolledCourse = store((state) => state.getEnrolledCourse);

  return {
    courses,
    currentCourse,
    enrolledCourses,
    isLoading,
    setCourses,
    setCurrentCourse,
    setEnrolledCourses,
    setLoading,
    getEnrolledCourseIds,
    getCourseProgress,
    getEnrolledCourse,
  };
};

export const useEventStore = () => {
  const events = store((state) => state.events);
  const currentEvent = store((state) => state.currentEvent);
  const isLoading = store((state) => state.isLoading);
  const setEvents = store((state) => state.setEvents);
  const setCurrentEvent = store((state) => state.setCurrentEvent);
  const setLoading = store((state) => state.setLoading);
  const getUpcomingEvents = store((state) => state.getUpcomingEvents);
  const getPastEvents = store((state) => state.getPastEvents);

  return {
    events,
    currentEvent,
    isLoading,
    setEvents,
    setCurrentEvent,
    setLoading,
    getUpcomingEvents,
    getPastEvents,
  };
};

export const useUIStore = () => {
  const theme = store((state) => state.theme);
  const sidebarOpen = store((state) => state.sidebarOpen);
  const isLoading = store((state) => state.isLoading);
  const setTheme = store((state) => state.setTheme);
  const setSidebarOpen = store((state) => state.setSidebarOpen);
  const setLoading = store((state) => state.setLoading);
  const toggleSidebar = store((state) => state.toggleSidebar);
  const toggleTheme = store((state) => state.toggleTheme);

  return {
    theme,
    sidebarOpen,
    isLoading,
    setTheme,
    setSidebarOpen,
    setLoading,
    toggleSidebar,
    toggleTheme,
  };
};