import { API_USER } from "@lib/api";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "api";
import { useAuth } from "./useAuth";
import { useLocalStorage } from "./useLocalStorage";
import { KEY_FOR_LS } from "@lib/enum/auth";
import { decode } from "jsonwebtoken";
import { DecodedAccessToken, UserInfo } from "@lib/interface/auth";

/**
 * Handle refresh token api request if there is access token in localStorage
 * @returns new access token if request succeeds
 */
const handleTokenApiReq = async (): Promise<string> => {
  const access_token = localStorage.getItem(KEY_FOR_LS.access_token);
  if (!access_token) return "Please log in first";

  const decoded = decode(access_token) as DecodedAccessToken;
  const isExpired = decoded ? Date.now() / 1000 > decoded.exp : null;
  if (isExpired === false) return "Token is valid";

  try {
    const res = await axiosInstance.post(API_USER.REFRESH);
    if (!res || !res.data) throw new Error();
    return res.data;
  } catch (error) {
    return "Fail to refresh";
  }
};

/**
 * Receives new access token from `handleTokenApiReq` and set token into localStorage
 *
 * Guard: if user info from decoded new access token does not match userInfo stored in localStorage, then throw error
 */
export const handleTokenRotation = async (): Promise<string> => {
  try {
    const data = await handleTokenApiReq();
    const decoded = decode(data) as DecodedAccessToken;
    const { username, email } = decoded;

    //if user info in localStorage doesn't match decoded access token, then log out user
    const userInfoInLS = localStorage.getItem(KEY_FOR_LS.user_info);
    if (!userInfoInLS) throw new Error("Please log in");

    const userInfo: UserInfo = JSON.parse(userInfoInLS);
    if (username !== userInfo.username || email !== userInfo.email)
      throw new Error("User info does not match");

    localStorage.setItem(KEY_FOR_LS.access_token, data);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const useRotateToken = () => {
  const { handleLogout } = useAuth("login");

  const {
    mutateAsync: mutateToken,
    status,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationKey: ["token", "refresh"],
    mutationFn: handleTokenRotation,
    onError: handleLogout,
    retry: 1,
  });

  return { mutateToken, status, isLoading };
};
