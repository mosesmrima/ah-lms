import { z } from 'zod';
import { UserRole } from './user';
import { CourseLevel } from './course';

// Enrollment status enum
export const EnrollmentStatus = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  PAUSED: 'paused',
  CANCELLED: 'cancelled',
} as const;

export type EnrollmentStatus = typeof EnrollmentStatus[keyof typeof EnrollmentStatus];

// Enrollment schema
export const enrollmentSchema = z.object({
  id: z.string(),
  userId: z.string(),
  courseId: z.string(),
  status: z.enum([
    EnrollmentStatus.ACTIVE,
    EnrollmentStatus.COMPLETED,
    EnrollmentStatus.PAUSED,
    EnrollmentStatus.CANCELLED,
  ]),
  enrolledAt: z.date(),
  lastAccessedAt: z.date(),
  completedAt: z.date().optional(),
  progress: z.object({
    percentage: z.number().min(0).max(100).default(0),
    completedLessons: z.array(z.string()), // Array of completed lesson IDs
    currentLesson: z.string().optional(), // Current lesson ID
    quizScores: z.record(z.string(), z.number()).optional(), // Quiz scores by quiz ID
  }),
  certificate: z.object({
    issued: z.boolean().default(false),
    issuedAt: z.date().optional(),
    certificateUrl: z.string().url().optional(),
    certificateId: z.string().optional(),
  }).optional(),
  payment: z.object({
    amount: z.number(),
    currency: z.string().length(3).default('USD'),
    status: z.enum(['pending', 'completed', 'refunded']),
    paymentId: z.string().optional(),
    paymentMethod: z.string().optional(),
    paidAt: z.date().optional(),
  }).optional(),
  notes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Enrollment = z.infer<typeof enrollmentSchema>;

// User's learning progress schema
export const learningProgressSchema = z.object({
  id: z.string(),
  userId: z.string(),
  courseId: z.string(),
  lessonId: z.string(),
  status: z.enum(['not_started', 'in_progress', 'completed']),
  watchTime: z.number().min(0).default(0), // Time watched in seconds
  lastPosition: z.number().min(0).default(0), // Video position in seconds
  completedAt: z.date().optional(),
  notes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type LearningProgress = z.infer<typeof learningProgressSchema>;

// User's course bookmark schema
export const courseBookmarkSchema = z.object({
  id: z.string(),
  userId: z.string(),
  courseId: z.string(),
  lessonId: z.string(),
  position: z.number().min(0), // Video position in seconds
  note: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CourseBookmark = z.infer<typeof courseBookmarkSchema>; 