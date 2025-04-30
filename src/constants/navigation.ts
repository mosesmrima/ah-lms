import { ROUTES } from '@/constants/routes';
import type { NavigationLink } from '@/types';

/**
 * Main navigation links for the header
 */
export const MAIN_NAV_LINKS: NavigationLink[] = [
  { label: 'Home', href: ROUTES.HOME },
  { label: 'Courses', href: ROUTES.COURSES },
  { label: 'Happenings', href: ROUTES.HAPPENINGS },
  { label: 'My Learnings', href: ROUTES.MY_LEARNINGS },
];

/**
 * Footer navigation links grouped by category
 */
export const FOOTER_LINKS = {
  company: [
    { label: 'About Us', href: ROUTES.ABOUT },
    { label: 'Contact', href: ROUTES.CONTACT },
    { label: 'Careers', href: '/careers' },
    { label: 'Partners', href: '/partners' },
  ],
  resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'Community', href: '/community' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Support', href: '/support' },
  ],
  legal: [
    { label: 'Terms of Service', href: ROUTES.TERMS },
    { label: 'Privacy Policy', href: ROUTES.PRIVACY },
    { label: 'Cookie Policy', href: '/cookie-policy' },
  ],
  social: [
    { label: 'Twitter', href: 'https://twitter.com/africahackon', isExternal: true },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/africahackon', isExternal: true },
    { label: 'Facebook', href: 'https://facebook.com/africahackon', isExternal: true },
    { label: 'Instagram', href: 'https://instagram.com/africahackon', isExternal: true },
  ],
} as const;

/**
 * Dashboard sidebar navigation links
 */
export const DASHBOARD_NAV_LINKS: NavigationLink[] = [
  { label: 'Dashboard', href: ROUTES.DASHBOARD },
  { label: 'My Courses', href: '/dashboard/courses' },
  { label: 'My Events', href: '/dashboard/events' },
  { label: 'Certificates', href: '/dashboard/certificates' },
  { label: 'Profile', href: ROUTES.PROFILE },
  { label: 'Settings', href: ROUTES.SETTINGS },
];
