import { googleLogout, useGoogleOneTapLogin } from "@react-oauth/google";
import jwt_decoded from "jwt-decode";
import { useRouter } from "next/router";
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

  const handleSetUserData = (res: GoogleCredentialResponse) => {
    console.log("res", res);

    if (!res) {
      console.log("error");
      return;
    }
    const decoded: Decoded = jwt_decoded(res.credential);
    console.log(decoded);

    if (decoded) router.push("/");
  };

  useGoogleOneTapLogin({
    onSuccess: (res: GoogleCredentialResponse) => handleSetUserData(res),
    onError: () => console.log("error"),
    cancel_on_tap_outside: false,
  });

  const handleGoogleLogout = () => {
    googleLogout();
  };

  return { handleGoogleLogout, handleSetUserData };
};
