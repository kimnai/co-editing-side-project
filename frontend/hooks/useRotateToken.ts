import { API_USER } from "@lib/api";
import { KEY_FOR_LS } from "@lib/enum/auth";
import { DecodedAccessToken, TokenRes, UserInfo } from "@lib/interface/auth";
import { refreshTokenErrorResponse } from "@lib/constant/auth";

import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "api";
import { useAuth } from "./useAuth";

import { decode } from "jsonwebtoken";

/**
 * Handle refresh token api request if there is access token in localStorage
 * @returns new access token if request succeeds, or else error string
 */
export const handleTokenApiReq = async (): Promise<TokenRes | string> => {
  try {
    //if there is no token or userInfo in localStorage, instruct user to log in first
    const access_token = localStorage.getItem(KEY_FOR_LS.access_token);
    const userInfoInLS = localStorage.getItem(KEY_FOR_LS.user_info);

    if (!access_token || !userInfoInLS)
      throw new Error(refreshTokenErrorResponse[401]);

    //if token is not expired, then return
    const decoded = decode(access_token) as DecodedAccessToken;
    const isExpired = decoded ? Date.now() / 1000 > decoded.exp : null;
    if (isExpired === false) return Promise.resolve("Token valid");

    const res = await axiosInstance.post(API_USER.REFRESH);
    if (!res || !res.data) throw new Error(res.statusText);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Receives new access token from `handleTokenApiReq` and set token into localStorage
 * Guard: if user info from decoded new access token does not match userInfo stored in localStorage, then throw error
 */
export const handleTokenRotation = async (): Promise<string> => {
  try {
    const data = await handleTokenApiReq();
    if (typeof data === "string" || !data.access_token) throw new Error();

    const decoded = decode(data.access_token) as DecodedAccessToken;
    const { username, email } = decoded;

    //if user info in localStorage doesn't match decoded access token, then log out user
    const userInfoInLS = localStorage.getItem(KEY_FOR_LS.user_info);
    if (!userInfoInLS) throw new Error(refreshTokenErrorResponse[401]);

    const userInfo: UserInfo = JSON.parse(userInfoInLS);
    if (username !== userInfo.username || email !== userInfo.email)
      throw new Error("User info does not match");

    localStorage.setItem(KEY_FOR_LS.access_token, data.access_token);
    return Promise.resolve(data.access_token);
  } catch (error) {
    return error;
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
