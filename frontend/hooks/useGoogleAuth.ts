import { LoginReqBody, SignupReqBody } from "@lib/interface/auth";
import { GoogleCredentialResponse } from "@react-oauth/google";
import { decode } from "jsonwebtoken";
import { useAuth } from "./useAuth";
import { AuthType } from "@lib/type/auth";
import { KEY_FOR_LS } from "@lib/enum/auth";
import { useLocalStorage } from "./useLocalStorage";

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
  const { addItem } = useLocalStorage();

  const handleGoogleLogin = async (
    res: GoogleCredentialResponse,
    authType: AuthType
  ) => {
    if (!res || !res.credential) return;
    const { credential } = res;
    const decoded = decode(credential) as DecodedGoogleCredential;
    const { name, email, picture } = decoded;
    console.log(decoded);

    if (authType === "signup") {
      const signupBody: SignupReqBody<"Google"> = {
        username: name,
        email: email,
        password: undefined,
        source: "Google",
      };
      // const signupRes = await handleSignupReq(signupBody);
      // if (!signupRes) return;
    }

    const body: LoginReqBody<"Google"> = {
      email: email,
      password: undefined,
      source: "Google",
    };

    // handleLoginReq(body);
    addItem(KEY_FOR_LS.user_info, { picture: picture });
  };

  return { handleGoogleLogin };
};
