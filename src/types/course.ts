import { z } from 'zod';

// Course category enum
export const CourseCategory = {
  WEB3: 'web3',
  BLOCKCHAIN: 'blockchain',
  CYBERSECURITY: 'cybersecurity',
  FINANCIAL: 'financial',
  TECHNOLOGY: 'technology',
  INNOVATION: 'innovation',
  LEADERSHIP: 'leadership',
  PERSONAL_DEVELOPMENT: 'personal_development',
  INVESTING: 'investing',
  WEALTH_CREATION: 'wealth_creation',
} as const;

export type CourseCategory = typeof CourseCategory[keyof typeof CourseCategory];

// Course level enum
export const CourseLevel = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
  ALL_LEVELS: 'all_levels',
} as const;

export type CourseLevel = typeof CourseLevel[keyof typeof CourseLevel];

// Course status enum
export const CourseStatus = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const;

export type CourseStatus = typeof CourseStatus[keyof typeof CourseStatus];

// Lesson schema
export const lessonSchema = z.object({
  id: z.string(),
  title: z.string().min(3).max(200),
  description: z.string().max(1000),
  videoUrl: z.string().url(),
  thumbnailUrl: z.string().url().optional(),
  duration: z.string(), // Format: "HH:MM:SS"
  order: z.number().int().min(0),
  courseId: z.string(),
  isPreview: z.boolean().default(false),
  resources: z.array(z.object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
    url: z.string().url(),
    size: z.number().optional(),
  })).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Lesson = z.infer<typeof lessonSchema>;

// Course schema
export const courseSchema = z.object({
  id: z.string(),
  title: z.string().min(3).max(200),
  slug: z.string().min(3).max(200),
  description: z.string().min(50).max(2000),
  shortDescription: z.string().max(200),
  instructor: z.string(), // Reference to User ID
  category: z.enum([
    CourseCategory.WEB3,
    CourseCategory.BLOCKCHAIN,
    CourseCategory.CYBERSECURITY,
    CourseCategory.FINANCIAL,
    CourseCategory.TECHNOLOGY,
    CourseCategory.INNOVATION,
    CourseCategory.LEADERSHIP,
    CourseCategory.PERSONAL_DEVELOPMENT,
    CourseCategory.INVESTING,
    CourseCategory.WEALTH_CREATION,
  ]),
  level: z.enum([
    CourseLevel.BEGINNER,
    CourseLevel.INTERMEDIATE,
    CourseLevel.ADVANCED,
    CourseLevel.ALL_LEVELS,
  ]),
  status: z.enum([
    CourseStatus.DRAFT,
    CourseStatus.PUBLISHED,
    CourseStatus.ARCHIVED,
  ]),
  thumbnailUrl: z.string().url(),
  price: z.number().min(0),
  currency: z.string().length(3).default('USD'),
  lessons: z.array(lessonSchema),
  enrolledStudents: z.number().int().min(0).default(0),
  rating: z.number().min(0).max(5).default(0),
  totalRatings: z.number().int().min(0).default(0),
  requirements: z.array(z.string()).optional(),
  objectives: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  publishedAt: z.date().optional(),
});

export type Course = z.infer<typeof courseSchema>;

// Course enrollment schema
export const courseEnrollmentSchema = z.object({
  id: z.string(),
  userId: z.string(),
  courseId: z.string(),
  enrolledAt: z.date(),
  completedAt: z.date().optional(),
  progress: z.number().min(0).max(100).default(0),
  lastAccessedAt: z.date(),
  completedLessons: z.array(z.string()), // Array of lesson IDs
  certificateIssued: z.boolean().default(false),
  certificateUrl: z.string().url().optional(),
});

export type CourseEnrollment = z.infer<typeof courseEnrollmentSchema>;

// Course review schema
export const courseReviewSchema = z.object({
  id: z.string(),
  userId: z.string(),
  courseId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10).max(1000),
  createdAt: z.date(),
  updatedAt: z.date(),
  isVerified: z.boolean().default(false),
});

export type CourseReview = z.infer<typeof courseReviewSchema>; 