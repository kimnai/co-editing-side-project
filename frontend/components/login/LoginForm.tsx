import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import classes from "@style/Login.module.css";

export const LoginForm: React.FC<{ action: "Log in" | "Sign up" }> = ({
  action,
}): JSX.Element => {
  const [pwdIsVisible, setPwdIsVisible] = useState(false);
  //   const { handleValidateInput } = useLogin();

  const labels = {
    email: "Email",
    pwd: "Password",
    account: "Account Name",
  };

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
        <div>
          <label htmlFor="account-name">{labels.account}</label>
          <input type="text" name="account" id="account" />
        </div>
      ) : (
        <></>
      )}
      <div>
        <label htmlFor="email">{labels.email}</label>
        <input type="email" name="email" id="email" />
      </div>
      <div>
        <label htmlFor="password">{labels.pwd}</label>
        <input type={pwdIsVisible ? "text" : "password"} name="pwd" id="pwd" />
        <IconButton
          size="medium"
          onClick={() => setPwdIsVisible((prev) => !prev)}
          className={classes.iconBtn}
        >
          {pwdIsVisible ? (
            <VisibilityOff fontSize="small" />
          ) : (
            <Visibility fontSize="small" />
          )}
        </IconButton>
      </div>
      <button className={classes.btn}>{action}</button>
      {action === "Log in" ? (
        <button className={classes.forgetPwdBtn}>Forget password?</button>
      ) : (
        <></>
      )}
    </form>
  );
};
