import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@/store';
import { userApi } from '@/lib/firebase/api';
import type { User } from '@/types';
import React from 'react';

export function useAuth() {
  const { user, setUser, logout } = useUserStore();
  const queryClient = useQueryClient();

  // Query to fetch current user data
  const { data: userData, isLoading } = useQuery<User>({
    queryKey: ['user', user?.id],
    queryFn: () => userApi.get(user!.id),
    enabled: !!user?.id
  });

  // Update user in store when data changes
  React.useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData, setUser]);

  // Login mutation
  const loginMutation = useMutation<User, Error, { email: string; password: string }>({
    mutationFn: async ({ email }) => {
      return userApi.getByEmail(email);
    },
    onSuccess: (data) => {
      setUser(data);
      queryClient.invalidateQueries({ queryKey: ['user', data.id] });
    }
  });

  // Logout mutation
  const logoutMutation = useMutation<void, Error>({
    mutationFn: async () => {
      // Here you would typically call your Firebase auth logout
      return;
    },
    onSuccess: () => {
      logout();
      queryClient.clear(); // Clear all queries from cache
    }
  });

  return {
    user: userData || user,
    isLoading,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending
  };
} 