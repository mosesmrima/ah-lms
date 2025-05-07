import { StateCreator } from 'zustand';
import type { User } from '@/types';

export interface UserSlice {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  
  // User actions
  setUser: (user: User | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => void;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  
  // Actions
  setUser: (user) => set({ user }),
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  logout: () => set({ user: null, isAuthenticated: false }),
}); 