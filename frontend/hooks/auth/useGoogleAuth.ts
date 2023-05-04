import {
  GoogleCredentialResponse,
  googleLogout,
  useGoogleOneTapLogin,
} from "@react-oauth/google";
import { useRouter } from "next/router";
import { useLocalStorage } from "@hooks/utility/useLocalStorage";
import { useUserAuthStore } from "store/useUserAuthStore";
import { decode } from "jsonwebtoken";
import { useAuth } from "./useAuth";
import { axiosInstance } from "api";
import { API_USER } from "@lib/api/Auth";

export interface DecodedGoogleCredential {
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  name: string;
  iat: number;
  jti: string;
  nbf: number;
  picture: string;
}

export const useGoogleAuth = () => {
  const { handleLogout, handleLoginResponse } = useAuth();
  const { loginInfo, setLoginInfo, setUserInfo } = useUserAuthStore();
  const router = useRouter();
  const handleGoogleLogin = async (res: GoogleCredentialResponse) => {
    if (!res) {
      console.error("error");
      return;
    }
    try {
      if (!res.credential) return;
      const { email, name } = decode(res.credential) as DecodedGoogleCredential;

      setLoginInfo({ isLoggedIn: true, isGoogleLogin: true });
      setUserInfo({
        username: name,
        email: email,
      });
      router.push("/");

      //TODO: should remove comment once BE API is established
      // const response = await axiosInstance.post(`${API_USER.LOGIN}`, {
      //   email: email,
      //   source: "google",
      // });

      // handleLoginResponse(response, "google");
    } catch (error) {
      console.error(error);
    }
  };

  useGoogleOneTapLogin({
    onSuccess: (res: GoogleCredentialResponse) => handleGoogleLogin(res),
    onError: () => console.log("error"),
    cancel_on_tap_outside: false,
    disabled: loginInfo.isLoggedIn,
  });

  const handleGoogleLogout = () => {
    googleLogout();
    handleLogout();
  };

  return { handleGoogleLogout, handleGoogleLogin };
};
