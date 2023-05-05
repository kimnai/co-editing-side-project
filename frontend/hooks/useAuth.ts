import { criteria } from "@lib/constant/auth";
import { AuthType } from "@lib/type/auth";
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
  const handleValidation = (): boolean => {
    console.log(refs, Object.values(refs));

    if (Object.values(refs).some((f) => f.current === null)) return false;
    console.log("submit");
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
    console.log("error", errors);

    setErrorState(errors);
    if (errors.length === 0) return true;
    return false;
  };

  const handleSubmitForm = () => {
    const isValid = handleValidation();
  };

  useEffect(() => {
    setErrorState([]);
  }, [authType]);

  return { refs, errorState, handleSubmitForm, handleValidation };
};
