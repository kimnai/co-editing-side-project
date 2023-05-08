import { LoginReqBody } from "@lib/interface/auth";
import { GoogleCredentialResponse } from "@react-oauth/google";
import { decode } from "jsonwebtoken";
import { useAuth } from "./useAuth";

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
  const { handleLoginReq } = useAuth("login");

  const handleGoogleLogin = (res: GoogleCredentialResponse) => {
    if (!res || !res.credential) return;
    const { credential } = res;
    const decoded = decode(credential) as DecodedGoogleCredential;
    const { name, email, picture, exp } = decoded;

    const body: LoginReqBody<"Google"> = {
      email: email,
      password: undefined,
      source: "Google",
    };

    //send login request to BE
    handleLoginReq("Google", body);
  };

  return { handleGoogleLogin };
};
