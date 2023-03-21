import React from "react";
import classes from "@style/Login.module.css";
import { InputField } from "./InputField";
import { useLogin } from "@hooks/useLogin";

export const LoginForm: React.FC<{ action: "Log in" | "Sign up" }> = ({
  action,
}): JSX.Element => {
  const { dispatch, state } = useLogin();

  return (
    <form
      className={classes.form}
      onSubmit={(e) => {
        e.preventDefault();
        console.log(e);
      }}
    >
      <h2>{action}</h2>
      {action === "Sign up" ? (
        <InputField inputType="account" state={state} dispatch={dispatch} />
      ) : (
        <></>
      )}
      <InputField inputType="email" state={state} dispatch={dispatch} />
      <InputField inputType="pwd" state={state} dispatch={dispatch} />
      <button className={classes.btn}>{action}</button>
      {action === "Log in" ? (
        <button className={classes.forgetPwdBtn}>Forget password?</button>
      ) : (
        <></>
      )}
    </form>
  );
};
