import { API_USER } from "@lib/api/Auth";
import { Tokens } from "@lib/interface/Auth";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "api";
import { decode } from "jsonwebtoken";
import { useRouter } from "next/router";
import { useUserAuthStore } from "store/useUserAuthStore";
import { useAuth } from "./useAuth";
import { useLocalStorage } from "@hooks/utility/useLocalStorage";

export const useVerifyToken = () => {
  const isBrowser = typeof window !== undefined;
  if (!isBrowser) return;
  const { resetAll, setLoginInfo } = useUserAuthStore();
  const router = useRouter();
  const { getItem, setItem, removeItem } = useLocalStorage();
  const tokens: Tokens | null = getItem("tokens");
  const { handleLogout } = useAuth();

  if (!tokens || !tokens?.refresh_token || !tokens?.access_token)
    handleLogout();

  const { refresh_token, access_token } = tokens;
  const { exp } = decode(access_token);
  const isExpired = Date.now() > exp * 1000;

  const rotateToken = async () => {
    if (!isExpired) return "Token valid";
    try {
      const res = await axiosInstance.post(`${API_USER.REFRESH}`, {
        headers: {
          Authorization: `Basic ${refresh_token}`,
        },
      });
      if (!res) throw new Error("Invalid refresh token");
      const { data } = res;

      removeItem("tokens");
      setItem("tokens", {
        refresh_token: refresh_token,
        access_token: data.access_token,
      });

      return Promise.resolve(data);
    } catch (error) {
      handleLogout();
    }
  };

  const { data, isLoading, isFetching, refetch, isRefetching } = useQuery({
    queryKey: ["refresh", "token"],
    queryFn: rotateToken,
    refetchInterval: 3 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: true,
  });

  return { isExpired, refetch, isRefetching, isFetching, data, rotateToken };
};
