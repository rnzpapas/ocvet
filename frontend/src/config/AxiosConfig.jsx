import axiosInstance from 'axiosInstance'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

const axiosInstanceInstance = axiosInstance.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export default axiosInstanceInstance;
