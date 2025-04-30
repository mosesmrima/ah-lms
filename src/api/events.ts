import { apiClient } from '@/api/client';
import type { Event } from '@/types';

/**
 * API functions for events-related operations
 */
export const eventsApi = {
  /**
   * Get all upcoming events
   */
  async getUpcomingEvents(limit = 6): Promise<Event[]> {
    return await apiClient.get<Event[]>(`/events/upcoming?limit=${limit}`);
  },

  /**
   * Get a single event by ID
   */
  async getEvent(id: string): Promise<Event> {
    return await apiClient.get<Event>(`/events/${id}`);
  },

  /**
   * Register for an event
   */
  async registerForEvent(eventId: string, userData: { name: string; email: string }): Promise<{ success: boolean; message: string }> {
    return await apiClient.post<{ success: boolean; message: string }>(`/events/${eventId}/register`, userData);
  },

  /**
   * Get events by category (e.g., hackathons, webinars, workshops)
   */
  async getEventsByCategory(category: string, limit = 4): Promise<Event[]> {
    return await apiClient.get<Event[]>(`/events/category/${category}?limit=${limit}`);
  },

  /**
   * Get past events
   */
  async getPastEvents(limit = 6, page = 1): Promise<{ events: Event[]; total: number; page: number; totalPages: number }> {
    return await apiClient.get<{ events: Event[]; total: number; page: number; totalPages: number }>(`/events/past?limit=${limit}&page=${page}`);
  }
}
