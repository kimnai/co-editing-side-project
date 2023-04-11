import {
  GoogleCredentialResponse,
  googleLogout,
  useGoogleOneTapLogin,
} from "@react-oauth/google";
import { useRouter } from "next/router";
import { ItemKeys } from "../lib/utility/useLocalStorage";
import { setItem, removeItem } from "../lib/utility/useLocalStorage";
import { useUserAuthStore } from "store/useUserAuthStore";
import { decode } from "jsonwebtoken";

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
  const { setIsLoggedIn, setTokenInfo, setUserInfo } = useUserAuthStore();

  const handleGoogleLogin = (res: GoogleCredentialResponse) => {
    if (!res) {
      console.error("error");
      return;
    }
    if (res.credential) {
      setItem(ItemKeys.oAuth_credential, res.credential);
      const { email, name, picture, exp } = decode(
        res.credential
      ) as DecodedGoogleCredential;
      setIsLoggedIn(true);
      setUserInfo({ username: name, email: email, picture: picture });
      setTokenInfo({ isExpired: Date.now() > exp });
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
    router.push("/login");
    removeItem(ItemKeys.oAuth_credential);
  };

  return { handleGoogleLogout, handleGoogleLogin };
};
