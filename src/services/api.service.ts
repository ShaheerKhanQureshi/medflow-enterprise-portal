
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '@/config/api.config';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Clear stored credentials on auth error
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// Generic API service methods
export const apiService = {
  async get<T>(url: string, config?: AxiosRequestConfig) {
    const response = await api.get<T>(url, config);
    return response.data;
  },

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    const response = await api.post<T>(url, data, config);
    return response.data;
  },

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    const response = await api.put<T>(url, data, config);
    return response.data;
  },

  async delete<T>(url: string, config?: AxiosRequestConfig) {
    const response = await api.delete<T>(url, config);
    return response.data;
  },
};

export default apiService;
