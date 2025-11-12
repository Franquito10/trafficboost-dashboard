import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para agregar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (email, password) =>
  api.post('/auth/login', { email, password });

export const getNews = (page = 1) =>
  api.get(`/news?page=${page}&limit=20`);

export const createNews = (newsData) =>
  api.post('/admin/news', newsData);

export const updateNews = (id, newsData) =>
  api.put(`/admin/news/${id}`, newsData);

export const deleteNews = (id) =>
  api.delete(`/admin/news/${id}`);

export default api;