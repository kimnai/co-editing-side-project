import axios from "axios";
import { Tokens } from "@lib/interface/Auth";
import { API_USER } from "@lib/api/Auth";

const baseUrl = "/backend";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 3000000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (
      config.url === `${API_USER.LOGIN}` ||
      config.url === `${API_USER.SIGNUP}`
    )
      return config;
    const tokenFromStorage = localStorage.getItem("tokens");

    if (tokenFromStorage === null) return config;
    const tokens = JSON.parse(tokenFromStorage);
    //rotate token if expires
    config.headers.Authorization = `Bearer ${tokens.access_token}`;
    return config;
  },
  (error) => {
    return Promise.reject(`Axios ${error}`);
  }
);
