import { Google, Visibility, VisibilityOff } from "@mui/icons-material";
import { Icon, IconButton } from "@mui/material";
import React, { useState } from "react";
import classes from "@style/Login.module.css";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";

export const LoginForm: React.FC = () => {
  const [pwdIsVisible, setPwdIsVisible] = useState(false);
  const [hasAccount, setHasAccount] = useState(true);
  const { handleGoogleLogin } = useGoogleAuth();

  return (
    <>
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
          <input
            type={pwdIsVisible ? "text" : "password"}
            name="pwd"
            id="pwd"
          />
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
        <button className={classes.btn}>
          {hasAccount ? "Log in" : "Sign up"}
        </button>
        {hasAccount ? (
          <button className={classes.forgetPwdBtn}>Forget password?</button>
        ) : (
          <></>
        )}
        <IconButton size="large" onClick={() => handleGoogleLogin()}>
          <Google fontSize="inherit" />
        </IconButton>
      </form>
    </>
  );
};
