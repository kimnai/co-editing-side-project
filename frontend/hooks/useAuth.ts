import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { decode } from "jsonwebtoken";

import { API_USER } from "@lib/api";
import {
  signupErrorResponse,
  loginErrorResponse,
  criteria,
} from "@lib/constant/auth";
import {
  DecodedAccessToken,
  DecodedGoogleCredential,
  LoginRes,
  UserInfo,
} from "@lib/interface/auth";
import { AuthType, LoginReqBody, SignupReqBody } from "@lib/type/auth";
import { KEY_FOR_LS } from "@lib/enum/auth";

import { axiosInstance } from "api";
import { useLocalStorage } from "./useLocalStorage";
import { GoogleCredentialResponse } from "@react-oauth/google";
import { AxiosError } from "axios";

export interface Error {
  field: "email" | "password" | "username" | "global";
  type?: "pattern" | "length";
  message?: string;
}

export const useAuth = (authType: AuthType) => {
  const { setItem, removeItem, addItem } = useLocalStorage();
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const usernameref = useRef<HTMLInputElement>(null);
  const refs =
    authType === "login"
      ? { emailRef, passwordRef }
      : { emailRef, passwordRef, usernameref };

  const [errorState, setErrorState] = useState<Error[]>([]);
  const router = useRouter();

  const handleValidation = (): boolean => {
    if (Object.values(refs).some((f) => f.current === null)) return false;
    let errors: Error[] = [];
    const email: string = emailRef.current!.value;
    const password: string = passwordRef.current!.value;

    if (!criteria.email.regex.test(email))
      errors.push({ field: "email", type: "pattern" });

    if (password.length < criteria.password.minLength)
      errors.push({ field: "password", type: "length" });

    if (authType === "signup") {
      const username: string = usernameref.current!.value;
      if (username.length < criteria.username.minLength)
        errors.push({ field: "username", type: "length" });
    }

    setErrorState(errors);
    if (errors.length === 0) return true;
    return false;
  };

  const handleApiError = (error: AxiosError) => {
    if (!error || !error.response) return;
    let errorMessage: string;
    const errorRes =
      authType === "login" ? loginErrorResponse : signupErrorResponse;

    if (error.response.status === 409) errorMessage = errorRes[409];
    else if (error.response.status === 400) errorMessage = errorRes[400];
    else if (authType === "login" && error.response.status === 401)
      errorMessage = errorRes[401];
    else errorMessage = errorRes[500];

    setErrorState((prev) => [{ field: "global", message: errorMessage }]);
    setIsLoading(false);
  };

  /**
   *
   * @param source
   * Handle login api request and subsequent side effects, including:
   *  - store access token in localStorage
   *  - store user info in global store
   *  - redirect user to home page
   */
  const handleLoginReq = async (
    body: LoginReqBody<"FirstParty" | "Google">
  ) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.post(API_USER.LOGIN, body);
      if (!res.data) throw new Error();

      const data: LoginRes = res.data;
      setItem(KEY_FOR_LS.access_token, data.access_token);
      const decodedAccessToken = decode(
        data.access_token
      ) as DecodedAccessToken;

      const userInfo: UserInfo = {
        username: decodedAccessToken.username,
        email: decodedAccessToken.email,
        loginProvider:
          body["source"] === "FirstParty" ? "FirstParty" : "Google",
      };
      setItem(KEY_FOR_LS.user_info, userInfo);
      setIsLoading(false);

      router.push("/home");
      return res;
    } catch (error) {
      // console.error(error);
      handleApiError(error);
    }
  };

  /**
   * handle signup api request and subsequent side effects, including:
   *  - redirect user to login page
   */
  const handleSignupReq = async (
    body: SignupReqBody<"FirstParty" | "Google">
  ) => {
    try {
      setIsLoading(true);

      const res = await axiosInstance.post(API_USER.SIGNUP, body);
      //TODO: display hint for user to login
      router.push("/auth/login");
      setIsLoading(false);

      return res;
    } catch (error) {
      console.error(error);
      handleApiError(error);
    }
  };

  const handleSubmitForm = () => {
    const isValid = handleValidation();
    if (!isValid) return;
    if (authType === "login") {
      const body: LoginReqBody<"FirstParty"> = {
        email: emailRef.current!.value,
        password: passwordRef.current!.value,
        source: "FirstParty",
      };
      handleLoginReq(body);
    } else {
      const body: SignupReqBody<"FirstParty"> = {
        username: usernameref.current!.value,
        email: emailRef.current!.value,
        password: passwordRef.current!.value,
        source: "FirstParty",
      };
      handleSignupReq(body);
    }
  };

  const handleGoogleLogin = async (
    res: GoogleCredentialResponse,
    authType: AuthType
  ) => {
    if (!res || !res.credential) return;
    const { credential } = res;
    const decoded = decode(credential) as DecodedGoogleCredential;
    const { name, email, picture } = decoded;

    if (authType === "signup") {
      const signupBody: SignupReqBody<"Google"> = {
        username: name,
        email: email,
        source: "Google",
      };
      const signupRes = await handleSignupReq(signupBody);
      if (!signupRes) return;
    }

    const body: LoginReqBody<"Google"> = {
      email: email,
      source: "Google",
    };

    await handleLoginReq(body);
    addItem(KEY_FOR_LS.user_info, { picture: picture });
  };

  const handleLogout = () => {
    router.push("/");
    removeItem(KEY_FOR_LS.access_token, KEY_FOR_LS.user_info);
  };

  useEffect(() => {
    setErrorState([]);
  }, [authType]);

  return {
    refs,
    errorState,
    isLoading,
    handleSubmitForm,
    handleValidation,
    handleLoginReq,
    handleSignupReq,
    handleLogout,
    handleGoogleLogin,
  };
};
