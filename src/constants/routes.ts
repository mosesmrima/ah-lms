/**
 * Application routes for navigation and linking
 */
export const ROUTES = {
  HOME: '/',
  COURSES: '/courses',
  COURSE_DETAIL: (id: string) => `/courses/${id}`,
  MY_LEARNINGS: '/my-learnings',
  DASHBOARD: '/dashboard',
  PROFILE: '/dashboard/profile',
  SETTINGS: '/dashboard/settings',
  HAPPENINGS: '/happenings',
  EVENT_DETAIL: (id: string) => `/happenings/${id}`,
  ABOUT: '/about',
  CONTACT: '/contact',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
} as const;
