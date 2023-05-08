import { API_USER } from "@lib/api";
import { authErrorResponse, criteria } from "@lib/constant/auth";
import { LoginReqBody } from "@lib/interface/auth";
import { AuthType, LoginSource } from "@lib/type/auth";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export interface Error {
  field: "email" | "password" | "username";
  type: "pattern" | "length";
}

export const useAuth = (authType: AuthType) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const usernameref = useRef(null);
  const refs =
    authType === "login"
      ? { emailRef, passwordRef }
      : { emailRef, passwordRef, usernameref };

  const [errorState, setErrorState] = useState<Error[]>([]);
  const router = useRouter();

  const handleValidation = (): boolean => {
    if (Object.values(refs).some((f) => f.current === null)) return false;
    let errors: Error[] = [];
    const email: string = emailRef.current.value;
    const password: string = passwordRef.current.value;

    if (!criteria.email.regex.test(email))
      errors.push({ field: "email", type: "pattern" });

    if (password.length < criteria.password.minLength)
      errors.push({ field: "password", type: "length" });

    if (authType === "signup") {
      const username: string = usernameref.current.value;
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
   * Handle login api request & response
   */
  const handleLoginReq = async (source: LoginSource, body) => {
    try {
      const res = await fetch(API_USER.LOGIN, body);

      if (!res.ok) {
        let error: string;
        if (res.status === 401) error = authErrorResponse[401];
        else if (res.status === 409) error = authErrorResponse[409];
        else if (res.status === 400) error = authErrorResponse[400];
        else error = authErrorResponse[500];
        throw new Error(error);
      }

      //set access token in localStorage
      localStorage.setItem("access_token", JSON.stringify(res));

      //set user info in global store

      //push to home page
      router.push("/home");
    } catch (error) {
      //TODO: display pop up for error
      console.log(error);
    }
  };

  const handleSubmitForm = () => {
    const isValid = handleValidation();

    if (!isValid) return;
    const body: LoginReqBody<"FirstParty"> = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      source: "FirstParty",
    };
    handleLoginReq("FirstParty", body);
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
