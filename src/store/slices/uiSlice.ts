import { StateCreator } from 'zustand';

export interface UISlice {
  // UI state
  theme: 'light' | 'dark' | 'system';
  sidebarOpen: boolean;
  isLoading: boolean;
  
  // UI actions
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setSidebarOpen: (open: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  toggleSidebar: () => void;
  toggleTheme: () => void;
}

export const createUISlice: StateCreator<UISlice> = (set, get) => ({
  // Initial state
  theme: 'system',
  sidebarOpen: false,
  isLoading: false,
  
  // Actions
  setTheme: (theme) => set({ theme }),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  setLoading: (isLoading) => set({ isLoading }),
  
  // Toggle actions
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleTheme: () => set((state) => ({
    theme: state.theme === 'light' ? 'dark' : 'light'
  })),
}); 