import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCourseStore, useUserStore } from '@/store';
import { courseApi } from '@/lib/firebase/api';
import type { Course } from '@/types';
import React from 'react';

export function useCourses() {
  const { setCourses, courses: storeCourses } = useCourseStore();
  const { user } = useUserStore();
  const queryClient = useQueryClient();

  // Query to fetch all courses
  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ['courses'],
    queryFn: () => courseApi.list()
  });

  // Update courses in store when data changes
  React.useEffect(() => {
    if (courses) {
      setCourses(courses);
    }
  }, [courses, setCourses]);

  // Query to fetch user's enrolled courses
  const { data: enrolledCourses } = useQuery<Course[]>({
    queryKey: ['enrolled-courses'],
    queryFn: () => courseApi.getEnrolledCourses(user?.id || ''),
    enabled: !!user?.id && !!storeCourses.length
  });

  // Mutation for creating a new course
  const createCourseMutation = useMutation<Course, Error, Omit<Course, 'id'>>({
    mutationFn: (courseData) => courseApi.create(courseData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    }
  });

  // Mutation for updating a course
  const updateCourseMutation = useMutation<void, Error, { id: string; data: Partial<Course> }>({
    mutationFn: ({ id, data }) => courseApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    }
  });

  // Mutation for deleting a course
  const deleteCourseMutation = useMutation<void, Error, string>({
    mutationFn: (courseId) => courseApi.delete(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    }
  });

  return {
    courses: courses || storeCourses,
    enrolledCourses,
    isLoading,
    createCourse: createCourseMutation.mutate,
    updateCourse: updateCourseMutation.mutate,
    deleteCourse: deleteCourseMutation.mutate,
    isCreating: createCourseMutation.isPending,
    isUpdating: updateCourseMutation.isPending,
    isDeleting: deleteCourseMutation.isPending
  };
} 