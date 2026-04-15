import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://techforge-backend-j3bu.onrender.com'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});