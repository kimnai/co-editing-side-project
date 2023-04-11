import axios from "axios";
import { getItem } from "@lib/utility/useLocalStorage";
import { Tokens } from "@lib/interface/Auth";

const instance = axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

instance.interceptors.request.use(
  (config) => {
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
  data = null,
  config
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
