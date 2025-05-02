import { apiClient } from '@/api/client';
import type { User } from '@/types';

/**
 * API functions for authentication and user management
 */
export const authApi = {
  /**
   * Login with email and password
   */
  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    const response = await apiClient.post<{ token: string; user: User }>('/auth/login', { email, password });
    
    // Store the token in localStorage for subsequent requests
    if (response.token) {
      localStorage.setItem('auth_token', response.token);
    }
    
    return response;
  },

  /**
   * Register a new user
   */
  async register(userData: { name: string; email: string; password: string }): Promise<{ token: string; user: User }> {
    const response = await apiClient.post<{ token: string; user: User }>('/auth/register', userData);
    
    // Store the token in localStorage for subsequent requests
    if (response.token) {
      localStorage.setItem('auth_token', response.token);
    }
    
    return response;
  },

  /**
   * Logout the current user
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      // Always remove the token from localStorage, even if the API call fails
      localStorage.removeItem('auth_token');
    }
  },

  /**
   * Get the current user profile
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      return await apiClient.get<User>('/auth/me');
    } catch {
      // If there's an error (like 401), return null instead of throwing
      return null;
    }
  },

  /**
   * Update user profile
   */
  async updateProfile(userData: Partial<User>): Promise<User> {
    return await apiClient.put<User>('/auth/profile', userData);
  },

  /**
   * Change password
   */
  async changePassword(data: { currentPassword: string; newPassword: string }): Promise<{ success: boolean; message: string }> {
    return await apiClient.post<{ success: boolean; message: string }>('/auth/change-password', data);
  },

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
    return await apiClient.post<{ success: boolean; message: string }>('/auth/forgot-password', { email });
  },

  /**
   * Reset password with token
   */
  async resetPassword(data: { token: string; password: string }): Promise<{ success: boolean; message: string }> {
    return await apiClient.post<{ success: boolean; message: string }>('/auth/reset-password', data);
  }
}
