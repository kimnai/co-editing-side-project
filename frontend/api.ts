import axios, { AxiosError, AxiosResponse } from "axios";
import { API_USER } from "@lib/api";
import { handleTokenRotation } from "@hooks/useRotateToken";
import { KEY_FOR_LS } from "@lib/enum/auth";

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

  const tokenFromStorage = localStorage.getItem(KEY_FOR_LS.access_token);

  if (tokenFromStorage === null) return config;
  const tokens = JSON.parse(tokenFromStorage);
  config.headers.Authorization = `Bearer ${tokens.access_token}`;

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError<any>) => {
    if (!error.response) return error;
    if (error.response.status === 403) {
      await handleTokenRotation();
      console.log("Token refreshed");
      return error;
    }
  }
);
