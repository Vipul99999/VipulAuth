import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
console.log("ENV:", import.meta.env);
console.log("BACKEND:", import.meta.env.VITE_BACKEND_URL);

// Global 401 handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized request");
    }
    return Promise.reject(error);
  }
);

export default api;
