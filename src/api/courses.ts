import { apiClient } from '@/api/client';
import type { Course } from '@/types';

/**
 * API functions for course-related operations
 */
export const coursesApi = {
  /**
   * Get all courses with optional filtering
   */
  async getCourses(params?: { 
    category?: string; 
    level?: string; 
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ courses: Course[]; total: number; page: number; totalPages: number }> {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return await apiClient.get<{ courses: Course[]; total: number; page: number; totalPages: number }>(`/courses${query}`);
  },

  /**
   * Get a single course by ID
   */
  async getCourse(id: string): Promise<Course> {
    return await apiClient.get<Course>(`/courses/${id}`);
  },

  /**
   * Get popular courses
   */
  async getPopularCourses(limit = 6): Promise<Course[]> {
    return await apiClient.get<Course[]>(`/courses/popular?limit=${limit}`);
  },

  /**
   * Get courses by category
   */
  async getCoursesByCategory(category: string, limit = 8): Promise<Course[]> {
    return await apiClient.get<Course[]>(`/courses/category/${category}?limit=${limit}`);
  },

  /**
   * Get recommended courses for a user
   */
  async getRecommendedCourses(userId: string, limit = 4): Promise<Course[]> {
    return await apiClient.get<Course[]>(`/courses/recommended?userId=${userId}&limit=${limit}`);
  },

  /**
   * Enroll in a course
   */
  async enrollCourse(courseId: string): Promise<{ success: boolean; message: string }> {
    return await apiClient.post<{ success: boolean; message: string }>(`/courses/${courseId}/enroll`);
  }
}
