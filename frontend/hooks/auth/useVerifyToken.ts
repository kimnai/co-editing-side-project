import { API_USER } from "@lib/api/Auth";
import { Tokens } from "@lib/interface/Auth";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "api";
import { JwtPayload, decode } from "jsonwebtoken";
import { useAuth } from "./useAuth";
import { useLocalStorage } from "@hooks/utility/useLocalStorage";
import { useEffect } from "react";
import { useUserAuthStore } from "store/useUserAuthStore";

export const useVerifyToken = () => {
  const { handleLogout } = useAuth();
  const { loginInfo } = useUserAuthStore();
  const { getItem, setItem } = useLocalStorage()!;

  const tokens: Tokens | null = getItem("tokens");
  console.log(tokens);

  //TODO: remove this guard clause afterward
  if (loginInfo.isGoogleLogin) return;

  //if there is no token in storage, then push to login page
  if (!tokens || (!loginInfo.isGoogleLogin && !tokens?.access_token)) {
    handleLogout();

    return;
  }

  const decodedToken = decode(tokens.access_token) as JwtPayload;
  const isExpired = Date.now() > decodedToken.exp * 1000;

  const rotateToken = async () => {
    if (!isExpired) return Promise.resolve("Token valid");
    const { refresh_token } = tokens;

    try {
      const res = await axiosInstance.post(`${API_USER.REFRESH}`, {
        headers: {
          Authorization: `Basic ${refresh_token}`,
        },
      });
      if (!res) throw new Error("Invalid refresh token");
      const { data } = res;

      setItem("tokens", {
        refresh_token: refresh_token,
        access_token: data.access_token,
      });

      return Promise.resolve(data);
    } catch (error) {
      handleLogout();
      Promise.reject("Error");
    }
  };

  const { data, isLoading, isFetching, refetch, isRefetching } = useQuery({
    queryKey: ["refresh", "token"],
    queryFn: rotateToken,
    retry: 1,
    refetchInterval: 3 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return { isExpired, refetch, isRefetching, isFetching, data, rotateToken };
};
