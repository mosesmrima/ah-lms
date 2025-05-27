import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCourseStore, useUserStore } from '@/store';
import { enrollmentApi } from '@/lib/firebase/api';
import type { Enrollment } from '@/types';
import React from 'react';

export function useEnrollments() {
  const { setEnrolledCourses, enrolledCourses: storeEnrollments } = useCourseStore();
  const { user } = useUserStore();
  const queryClient = useQueryClient();

  // Query to fetch all enrollments
  const { data: enrollments, isLoading } = useQuery<Enrollment[], Error>({
    queryKey: ['enrollments'],
    queryFn: () => enrollmentApi.list()
  });

  // Update enrollments in store when data changes
  React.useEffect(() => {
    if (enrollments) {
      setEnrolledCourses(enrollments);
    }
  }, [enrollments, setEnrolledCourses]);

  // Query to fetch user's enrollments
  const { data: userEnrollments } = useQuery<Enrollment[], Error>({
    queryKey: ['user-enrollments'],
    queryFn: () => enrollmentApi.getUserEnrollments(user?.id || ''),
    enabled: !!user?.id && !!storeEnrollments.length
  });

  // Mutation for creating a new enrollment
  const createEnrollmentMutation = useMutation<Enrollment, Error, Omit<Enrollment, 'id'>>({
    mutationFn: (enrollmentData) => enrollmentApi.create(enrollmentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
      queryClient.invalidateQueries({ queryKey: ['user-enrollments'] });
    }
  });

  // Mutation for updating an enrollment
  const updateEnrollmentMutation = useMutation<void, Error, { id: string; data: Partial<Enrollment> }>({
    mutationFn: ({ id, data }) => enrollmentApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
      queryClient.invalidateQueries({ queryKey: ['user-enrollments'] });
    }
  });

  // Mutation for deleting an enrollment
  const deleteEnrollmentMutation = useMutation<void, Error, string>({
    mutationFn: (enrollmentId) => enrollmentApi.delete(enrollmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
      queryClient.invalidateQueries({ queryKey: ['user-enrollments'] });
    }
  });

  return {
    enrollments: enrollments || storeEnrollments,
    userEnrollments,
    isLoading,
    createEnrollment: createEnrollmentMutation.mutate,
    updateEnrollment: updateEnrollmentMutation.mutate,
    deleteEnrollment: deleteEnrollmentMutation.mutate,
    isCreating: createEnrollmentMutation.isPending,
    isUpdating: updateEnrollmentMutation.isPending,
    isDeleting: deleteEnrollmentMutation.isPending
  };
} 
