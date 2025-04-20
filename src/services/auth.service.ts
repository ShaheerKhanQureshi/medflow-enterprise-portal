
import { API_ENDPOINTS } from '@/config/api.config';
import apiService from './api.service';

export interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const authService = {
  async login(data: LoginRequest) {
    const response = await apiService.post<LoginResponse>(API_ENDPOINTS.LOGIN, data);
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('userRole', response.user.role.toLowerCase());
    }
    return response;
  },

  async logout() {
    try {
      await apiService.post(API_ENDPOINTS.LOGOUT);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
    }
  },

  async forgotPassword(email: string) {
    return await apiService.post(API_ENDPOINTS.FORGOT_PASSWORD, { email });
  },

  async resetPassword(token: string, password: string) {
    return await apiService.post(API_ENDPOINTS.RESET_PASSWORD, { token, password });
  },
};

export default authService;
