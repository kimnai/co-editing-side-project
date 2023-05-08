import { API_USER } from "@lib/api";
import {
  signupErrorResponse,
  loginErrorResponse,
  criteria,
} from "@lib/constant/auth";
import { LoginReqBody, SignupReqBody } from "@lib/interface/auth";
import { AuthType, LoginSource } from "@lib/type/auth";
import { axiosInstance } from "api";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export interface Error {
  field: "email" | "password" | "username" | "global";
  type?: "pattern" | "length";
  message?: string;
}

export const useAuth = (authType: AuthType) => {
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

  const handleApiError = (error) => {
    let errorMessage: string;
    const errorRes =
      authType === "login" ? loginErrorResponse : signupErrorResponse;

    if (error.response.status === 409) errorMessage = errorRes[409];
    if (error.response.status === 400) errorMessage = errorRes[400];
    if (authType === "login" && error.response.status === 401)
      errorMessage = errorRes[401];
    else error = errorRes[500];
    setErrorState([{ field: "global", message: error }]);
  };

  /**
   *
   * @param source
   * Handle login api request and subsequent side effects, including:
   *  - store access token in localStorage
   *  - store user info in global store
   *  - redirect user to home page
   */
  const handleLoginReq = async (body) => {
    try {
      const res = await axiosInstance.post(API_USER.LOGIN, body);
      localStorage.setItem("access_token", JSON.stringify(res));

      //set user info in global store
      router.push("/home");
    } catch (error) {
      console.error(error);
      handleApiError(error);
    }
  };

  /**
   * handle signup api request and subsequent side effects, including:
   *  - redirect user to login page
   */
  const handleSignupReq = async (body: SignupReqBody) => {
    try {
      const res = await axiosInstance.post(API_USER.SIGNUP, body);
      //TODO: display hint for user to login
      router.push("/login");
    } catch (error) {
      console.log("error", error);
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
      const body: SignupReqBody = {
        username: usernameref.current!.value,
        email: emailRef.current!.value,
        password: passwordRef.current!.value,
      };
      handleSignupReq(body);
    }
  };

  useEffect(() => {
    setErrorState([]);
  }, [authType]);

  return {
    refs,
    errorState,
    handleSubmitForm,
    handleValidation,
    handleLoginReq,
  };
};
