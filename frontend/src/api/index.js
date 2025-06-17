import axios from 'axios';

// console.log('API Base URL:', process.env.REACT_APP_API_URL);

const api = axios.create({
  // baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  baseURL: process.env.REACT_APP_API_URL || 'https://task-management-app-backend.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  signup: (data) => api.post('/api/auth/signup', data),
  login: (data) => api.post('/api/auth/login', data),
};

export const taskAPI = {
  getTasks: (params) => api.get('/api/tasks', { params }),
  createTask: (data) => api.post('/api/tasks', data),
  updateTask: (id, data) => api.put(`/api/tasks/${id}`, data),
  deleteTask: (id) => api.delete(`/api/tasks/${id}`),
  updateStatus: (id, status) => api.patch(`/api/tasks/${id}/status`, { status }),
};

export default api;