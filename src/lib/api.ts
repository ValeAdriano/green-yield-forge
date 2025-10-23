import axios, { AxiosError } from 'axios';
import { toast } from '@/hooks/use-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Adicionar idempotency key para POST requests
    if (config.method === 'post' && !config.headers['Idempotency-Key']) {
      config.headers['Idempotency-Key'] = crypto.randomUUID();
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; detail?: string }>) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.detail ||
      'Ocorreu um erro. Tente novamente.';

    toast({
      title: 'Erro',
      description: message,
      variant: 'destructive',
    });

    return Promise.reject(error);
  }
);

export default api;
