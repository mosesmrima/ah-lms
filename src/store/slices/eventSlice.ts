import { StateCreator } from 'zustand';
import type { Event } from '@/types';

export interface EventSlice {
  // Event state
  events: Event[];
  currentEvent: Event | null;
  isLoading: boolean;
  
  // Event actions
  setEvents: (events: Event[]) => void;
  setCurrentEvent: (event: Event | null) => void;
  setLoading: (isLoading: boolean) => void;
  
  // Event computed values
  getUpcomingEvents: () => Event[];
  getPastEvents: () => Event[];
}

export const createEventSlice: StateCreator<EventSlice> = (set, get) => ({
  // Initial state
  events: [],
  currentEvent: null,
  isLoading: false,
  
  // Actions
  setEvents: (events) => set({ events }),
  setCurrentEvent: (currentEvent) => set({ currentEvent }),
  setLoading: (isLoading) => set({ isLoading }),
  
  // Computed values
  getUpcomingEvents: () => {
    const { events } = get();
    const now = new Date();
    return events.filter(event => new Date(event.startDate) > now);
  },
  
  getPastEvents: () => {
    const { events } = get();
    const now = new Date();
    return events.filter(event => new Date(event.endDate) < now);
  },
}); 