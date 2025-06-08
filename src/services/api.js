
import axios from 'axios';
import { toast } from '@/components/ui/sonner';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'An error occurred';
    toast.error(message);
    throw error;
  }
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  verifyOTP: (data) => api.post('/auth/verify-otp', data)
};

export const roomAPI = {
  create: (data) => api.post('/room/create', data),
  check: (data) => api.post('/room/check', data),
  join: (data) => api.post('/room/join', data)
};

export default api;
