import { API_USER } from "@lib/api";
import {
  signupErrorResponse,
  loginErrorResponse,
  criteria,
} from "@lib/constant/auth";
import { LoginReqBody, SignupReqBody } from "@lib/interface/auth";
import { AuthType, LoginSource } from "@lib/type/auth";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export interface Error {
  field: "email" | "password" | "username";
  type: "pattern" | "length";
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

  /**
   *
   * @param source
   * Handle login api request and subsequent side effects, including:
   *  - store access token in localStorage
   *  - store user info in global store
   *  - redirect user to home page
   */
  const handleLoginReq = async (source: LoginSource, body) => {
    try {
      const res = await fetch(API_USER.LOGIN, {
        method: "POST",
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        let error: string;
        if (res.status === 401) error = loginErrorResponse[401];
        else if (res.status === 409) error = loginErrorResponse[409];
        else if (res.status === 400) error = loginErrorResponse[400];
        else error = loginErrorResponse[500];
        throw new Error(error);
      }

      localStorage.setItem("access_token", JSON.stringify(res));

      //set user info in global store

      router.push("/home");
    } catch (error) {
      //TODO: display pop up for error
      console.error(error);
    }
  };

  /**
   * handle signup api request and subsequent side effects, including:
   *  - redirect user to login page
   */
  const handleSignupReq = async (body: SignupReqBody) => {
    try {
      const res = await fetch(API_USER.SIGNUP, {
        method: "POST",
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        let error: string;
        if (res.status === 409) error = signupErrorResponse[409];
        if (res.status === 400) error = signupErrorResponse[400];
        else error = signupErrorResponse[500];
        throw new Error(error);
      }

      //TODO: tell user to login
      router.push("/login");
    } catch (error) {
      //TODO: display pop up for error
      console.error(error);
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
      handleLoginReq("FirstParty", body);
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
