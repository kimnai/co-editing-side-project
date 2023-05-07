import { GoogleCredentialResponse } from "@react-oauth/google";
import { decode } from "jsonwebtoken";

interface DecodedGoogleCredential {
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
  //get & decode the ID token
  const handleGoogleLogin = (res: GoogleCredentialResponse) => {
    if (!res || !res.credential) return;
    const { credential } = res;
    const decoded = decode(credential) as DecodedGoogleCredential;
    const { name, email, picture, exp } = decoded;

    //POST user/login
  };

  return { handleGoogleLogin };
};
