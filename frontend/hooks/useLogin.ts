import { useState } from "react";

export const handleSubmitLogin = (email: string, pwd: string) => {
  let emailIsValid = false;
  let pwdIsValid = false;

  if (email.match(/\w*\@gmail.com/)) emailIsValid = true;
  if (pwd.length >= 8 && pwd.match(/\w*[!~@#$%^&*]/)) pwdIsValid = true;
  return { emailIsValid, pwdIsValid };
};

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  return { email, pwd, setEmail, setPwd, handleSubmitLogin };
};
