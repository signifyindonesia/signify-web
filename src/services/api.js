import axios from "axios";
import { getToken } from "../utils/auth";

const api = axios.create({
  baseURL: "https://signify-api.onrender.com/", // Ganti dengan base URL backend kamu
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
