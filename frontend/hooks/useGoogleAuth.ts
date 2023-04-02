import { googleLogout, useGoogleOneTapLogin } from "@react-oauth/google";
import jwt_decoded from "jwt-decode";
import { useRouter } from "next/router";
import { ItemKeys, useLocalStorage } from "./useLocalStorage";
interface GoogleCredentialResponse {
  credential?: string;
}

interface Decoded {
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
  const { setItem, removeItem, getItem } = useLocalStorage();

  const handleSetUserData = (res: GoogleCredentialResponse) => {
    if (!res) {
      console.error("error");
      return;
    }
    if (res.credential) {
      setItem(ItemKeys.oAuth_credential, res.credential);
      router.push("/");
    }
  };

  useGoogleOneTapLogin({
    onSuccess: (res: GoogleCredentialResponse) => handleSetUserData(res),
    onError: () => console.log("error"),
    cancel_on_tap_outside: false,
  });

  const handleGoogleLogout = () => {
    console.log("log out");
    googleLogout();
    router.push("/login");
    localStorage.removeItem(ItemKeys.oAuth_credential);
  };

  return { handleGoogleLogout, handleSetUserData };
};
