// Base API client for making requests to the backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.africahackon-academy.com';

/**
 * Handles API requests with proper error handling and authentication
 */
export const apiClient = {
  /**
   * Performs a GET request
   */
  async get<T>(endpoint: string, options = {}): Promise<T> {
    return await request<T>('GET', endpoint, undefined, options);
  },

  /**
   * Performs a POST request
   */
  async post<T>(endpoint: string, data?: any, options = {}): Promise<T> {
    return await request<T>('POST', endpoint, data, options);
  },

  /**
   * Performs a PUT request
   */
  async put<T>(endpoint: string, data?: any, options = {}): Promise<T> {
    return await request<T>('PUT', endpoint, data, options);
  },

  /**
   * Performs a DELETE request
   */
  async delete<T>(endpoint: string, options = {}): Promise<T> {
    return await request<T>('DELETE', endpoint, undefined, options);
  }
};

/**
 * Core request function that handles all API calls
 */
async function request<T>(
  method: string,
  endpoint: string,
  data?: any,
  options = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...(options as any).headers
  };

  const config: RequestInit = {
    method,
    headers,
    ...options,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);
    
    // Handle 401 Unauthorized - refresh token or redirect to login
    if (response.status === 401) {
      // You could implement token refresh logic here
      // Or redirect to login page
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }
    
    // For other error responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }
    
    // Handle empty responses
    if (response.status === 204) {
      return {} as T;
    }
    
    // Parse JSON response
    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

/**
 * Gets the authentication header with the JWT token if available
 */
function getAuthHeader() {
  if (typeof window === 'undefined') {
    return {};
  }
  
  const token = localStorage.getItem('auth_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}
