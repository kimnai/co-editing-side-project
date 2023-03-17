import {
  CancelRounded,
  DeleteRounded,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
// import { useLogin } from "../../hooks/useLogin";
import classes from "../../styles/Login.module.css";

export const LoginForm: React.FC = () => {
  const [pwdIsVisible, setPwdIsVisible] = useState(false);
  const [hasAccount, setHasAccount] = useState(true);
  //   const { handleValidateInput } = useLogin();

  return (
    <form
      className={classes.form}
      onSubmit={(e) => {
        e.preventDefault();
        console.log(e);
      }}
    >
      <h2>{hasAccount ? "Log in" : "Sign up"}</h2>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type={pwdIsVisible ? "text" : "password"} name="pwd" id="pwd" />
        <IconButton
          size="small"
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
      <button>{hasAccount ? "Log in" : "Sign up"}</button>
      {hasAccount ? (
        <button className={classes.forgetPwdBtn}>Forget password?</button>
      ) : (
        <></>
      )}
    </form>
  );
};
