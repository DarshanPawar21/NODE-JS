import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const adminApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/banking",
  withCredentials: true,
});

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
export default api;  
