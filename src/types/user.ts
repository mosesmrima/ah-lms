import { z } from 'zod';

// User role enum
export const UserRole = {
  STUDENT: 'student',
  INSTRUCTOR: 'instructor',
  ADMIN: 'admin',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

// User schema with Zod
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().min(2).max(100),
  image: z.string().url().optional(),
  role: z.enum([UserRole.STUDENT, UserRole.INSTRUCTOR, UserRole.ADMIN]),
  createdAt: z.date(),
  updatedAt: z.date(),
  lastLoginAt: z.date().optional(),
  isActive: z.boolean().default(true),
  preferences: z.object({
    emailNotifications: z.boolean().default(true),
    pushNotifications: z.boolean().default(true),
    theme: z.enum(['light', 'dark', 'system']).default('system'),
  }).optional(),
});

// Type inference from schema
export type User = z.infer<typeof userSchema>;

// User profile schema (extended user information)
export const userProfileSchema = userSchema.extend({
  bio: z.string().max(500).optional(),
  location: z.string().optional(),
  website: z.string().url().optional(),
  socialLinks: z.object({
    twitter: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
  }).optional(),
  skills: z.array(z.string()).optional(),
  education: z.array(z.object({
    institution: z.string(),
    degree: z.string(),
    field: z.string(),
    startDate: z.date(),
    endDate: z.date().optional(),
  })).optional(),
});

export type UserProfile = z.infer<typeof userProfileSchema>; 