import axios from "axios";
import { API_USER } from "@lib/api";

const baseUrl = "/backend";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 3000000,
});

axiosInstance.interceptors.request.use((config) => {
  if (config.url === `${API_USER.LOGIN}` || config.url === `${API_USER.SIGNUP}`)
    return config;

  if (config.url === API_USER.REFRESH) {
    config.withCredentials = true;
    return config;
  }

  const tokenFromStorage = localStorage.getItem("access_token");

  if (tokenFromStorage === null) return config;
  const tokens = JSON.parse(tokenFromStorage);
  config.headers.Authorization = `Bearer ${tokens.access_token}`;

  return config;
});
