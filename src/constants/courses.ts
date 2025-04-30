/**
 * Course-related constants for the Africa Tech LMS
 */

/**
 * Course categories
 */
export const COURSE_CATEGORIES = [
  'Cybersecurity',
  'Web Development',
  'Mobile Development',
  'Data Science',
  'Cloud Computing',
  'DevOps',
  'Blockchain',
  'Artificial Intelligence',
  'Machine Learning',
  'UI/UX Design',
] as const;

/**
 * Course difficulty levels
 */
export const COURSE_LEVELS = [
  'Beginner',
  'Intermediate',
  'Advanced',
] as const;

/**
 * Course duration formats
 */
export const COURSE_DURATION_FORMATS = [
  'Self-paced',
  '1-2 weeks',
  '2-4 weeks',
  '1-3 months',
  '3+ months',
] as const;

/**
 * Course filter options
 */
export const COURSE_FILTERS = {
  SORT_OPTIONS: [
    { label: 'Most Popular', value: 'popularity' },
    { label: 'Newest', value: 'newest' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Rating', value: 'rating' },
  ],
  PRICE_RANGES: [
    { label: 'All Prices', value: 'all' },
    { label: 'Free', value: 'free' },
    { label: 'Paid', value: 'paid' },
    { label: 'Under $50', value: 'under_50' },
    { label: '$50 - $100', value: '50_100' },
    { label: 'Over $100', value: 'over_100' },
  ],
} as const;
