import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "/",
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  // Attach auth headers here when a provider is enabled.
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
