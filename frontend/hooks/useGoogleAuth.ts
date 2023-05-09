import { LoginReqBody, SignupReqBody } from "@lib/interface/auth";
import { GoogleCredentialResponse } from "@react-oauth/google";
import { decode } from "jsonwebtoken";
import { useAuth } from "./useAuth";
import { AuthType } from "@lib/type/auth";

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
  const { handleLoginReq, handleSignupReq } = useAuth("login");

  const handleGoogleLogin = async (
    res: GoogleCredentialResponse,
    authType: AuthType
  ) => {
    if (!res || !res.credential) return;
    const { credential } = res;
    const decoded = decode(credential) as DecodedGoogleCredential;
    const { name, email, picture, exp } = decoded;

    if (authType === "signup") {
      const signupBody: SignupReqBody<"Google"> = {
        username: name,
        email: email,
        password: undefined,
        source: "Google",
      };
      const signupRes = await handleSignupReq(signupBody);
      if (!signupRes) return;
    }

    const body: LoginReqBody<"Google"> = {
      email: email,
      password: undefined,
      source: "Google",
    };

    //send login request to BE
    handleLoginReq(body);
  };

  return { handleGoogleLogin };
};
