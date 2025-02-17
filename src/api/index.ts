import axios from 'axios';
import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios';


const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_HOST}`,
  responseType: 'json',
  withCredentials: true,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: unknown) => {
    return Promise.reject(error);
  },
);

export default api;
