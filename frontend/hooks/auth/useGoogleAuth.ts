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
  const router = useRouter();
  const { handleLogout } = useAuth();
  const { setLoginInfo, setUserInfo } = useUserAuthStore();
  const { setItem, getItem, removeItem } = useLocalStorage();
  const handleGoogleLogin = (res: GoogleCredentialResponse) => {
    if (!res) {
      console.error("error");
      return;
    }
    if (res.credential) {
      setItem("tokens", { credential: res.credential });
      const { email, name, picture, exp } = decode(
        res.credential
      ) as DecodedGoogleCredential;

      setLoginInfo({ isLoggedIn: true, isGoogleLogin: true });
      setUserInfo({ username: name, email: email, picture: picture });
      router.push("/");
    }
  };

  useGoogleOneTapLogin({
    onSuccess: (res: GoogleCredentialResponse) => handleGoogleLogin(res),
    onError: () => console.log("error"),
    cancel_on_tap_outside: false,
  });

  const handleGoogleLogout = () => {
    googleLogout();
    handleLogout();
  };

  return { handleGoogleLogout, handleGoogleLogin };
};
