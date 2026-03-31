// ================================================================
// API SERVICE - Client HTTP centralisé (à mettre dans src/utils/)
// Usage : import { api } from '@/utils/apiService'
// ================================================================
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || '';

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Intercepteur requête : ajoute le Bearer token automatiquement
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Intercepteur réponse : refresh automatique si token expiré (401)
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as AxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('Pas de refresh token');
        const { data } = await axios.post(`${BASE_URL}/api/auth/refresh`, { refreshToken });
        const newToken = data.data.accessToken;
        localStorage.setItem('accessToken', newToken);
        if (original.headers) original.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(original);
      } catch {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

// Réponse standardisée de l'API : { success, data, message, pagination }
type ApiResponse<T> = { success: boolean; data: T; message?: string; pagination?: Pagination };
export type Pagination = {
  page: number; limit: number; total: number;
  totalPages: number; hasNext: boolean; hasPrev: boolean;
};

export const api = {
  get:    <T>(url: string, params?: Record<string, unknown>) =>
    apiClient.get<ApiResponse<T>>(url, { params }).then(r => r.data),

  post:   <T>(url: string, body?: unknown) =>
    apiClient.post<ApiResponse<T>>(url, body).then(r => r.data),

  put:    <T>(url: string, body?: unknown) =>
    apiClient.put<ApiResponse<T>>(url, body).then(r => r.data),

  patch:  <T>(url: string, body?: unknown) =>
    apiClient.patch<ApiResponse<T>>(url, body).then(r => r.data),

  delete: <T>(url: string) =>
    apiClient.delete<ApiResponse<T>>(url).then(r => r.data),

  // Pour les uploads multipart/form-data (images, documents)
  upload: <T>(url: string, formData: FormData) =>
    apiClient.post<ApiResponse<T>>(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(r => r.data),
};

export default apiClient;