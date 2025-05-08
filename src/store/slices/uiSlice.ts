import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface UISlice {
  // UI state
  theme: 'light' | 'dark' | 'system';
  sidebarOpen: boolean;
  isLoading: boolean;
  
  // UI actions
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setSidebarOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
  toggleSidebar: () => void;
  toggleTheme: () => void;
}

export const createUISlice = (set: Parameters<StateCreator<UISlice>>[0]): UISlice => ({
  theme: 'system' as const,
  sidebarOpen: false,
  isLoading: false,
  setTheme: (theme: 'light' | 'dark' | 'system') => set({ theme }),
  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  toggleSidebar: () => set((state: UISlice) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleTheme: () => set((state: UISlice) => ({
    theme: state.theme === 'light' ? 'dark' : 'light'
  })),
});

export const useUIStore = create<UISlice>()(
  devtools(
    (set) => ({
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
    }),
    { name: 'ui-store' }
  )
); 