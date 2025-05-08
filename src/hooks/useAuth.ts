import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@/store';
import { userApi } from '@/lib/firebase/api';
import { signInWithEmailAndPassword, signInWithGoogle, createUserWithEmailAndPassword } from '@/lib/firebase/utils';
import { auth } from '@/lib/firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import type { User } from '@/types';
import React from 'react';

export function useAuth() {
  const { user, setUser, logout } = useUserStore();
  const queryClient = useQueryClient();

  // Listen to auth state changes
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user data from Firestore
        const userData = await userApi.getByEmail(firebaseUser.email!);
        setUser(userData);
      } else {
        logout();
      }
    });

    return () => unsubscribe();
  }, [setUser, logout]);

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
    mutationFn: async ({ email, password }) => {
      await signInWithEmailAndPassword(email, password);
      return userApi.getByEmail(email);
    },
    onSuccess: (data) => {
      setUser(data);
      queryClient.invalidateQueries({ queryKey: ['user', data.id] });
    }
  });

  // Google Sign In mutation
  const googleSignInMutation = useMutation<User, Error>({
    mutationFn: async () => {
      const result = await signInWithGoogle();
      return userApi.getByEmail(result.user.email!);
    },
    onSuccess: (data) => {
      setUser(data);
      queryClient.invalidateQueries({ queryKey: ['user', data.id] });
    }
  });

  // Sign Up mutation
  const signUpMutation = useMutation<User, Error, { email: string; password: string; fullName: string }>({
    mutationFn: async ({ email, password, fullName }) => {
      await createUserWithEmailAndPassword(email, password, fullName);
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
      await signOut(auth);
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
    signUp: signUpMutation.mutate,
    signInWithGoogle: googleSignInMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isSigningUp: signUpMutation.isPending,
    isGoogleSigningIn: googleSignInMutation.isPending,
    isLoggingOut: logoutMutation.isPending
  };
} 