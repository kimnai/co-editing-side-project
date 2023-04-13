import axios from "axios";
import { getItem } from "@lib/utility/useLocalStorage";
import { Tokens } from "@lib/interface/Auth";
import { API_USER } from "@lib/api/Auth";

const baseUrl = "http://co-editing_backend:8080/";

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

instance.interceptors.request.use(
  (config) => {
    if (
      config.url === `${API_USER.LOGIN}` ||
      config.url === `${API_USER.SIGNUP}`
    )
      return config;
    const tokens = getItem("tokens");
    //rotate token if expires
    const { access_token } = tokens as Tokens;
    config.headers.Authorization = `Bearer ${access_token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const axiosReq = (
  method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH",
  url: string,
  data?: unknown | undefined,
  config?: any | undefined
) => {
  switch (method) {
    case "GET": {
      return instance.get(url, { params: data });
    }
    case "POST": {
      return instance.post(url, data, config);
    }
    case "PATCH": {
      return instance.patch(url, data);
    }
    case "PUT": {
      return instance.put(url, data);
    }
    case "DELETE": {
      return instance.delete(url, { params: data });
    }
    default: {
      console.error("Unknown method");
      return false;
    }
  }
};
