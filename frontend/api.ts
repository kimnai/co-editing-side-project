import axios from "axios";
import { Tokens } from "@lib/interface/Auth";
import { API_USER } from "@lib/api/Auth";

const baseUrl = "http://co-editing_backend:8080/";

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
    const tokens = localStorage.getItem("tokens");
    if (tokens === null) return config;
    //rotate token if expires
    const { access_token } = tokens as Tokens;
    config.headers.Authorization = `Bearer ${access_token}`;
    return config;
  },
  (error) => {
    return Promise.reject(`Axios ${error}`);
  }
);
