import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import classes from "@style/Login.module.css";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@hooks/auth/useAuth";

export const LoginForm: React.FC = (): JSX.Element => {
  const [pwdIsVisible, setPwdIsVisible] = useState(false);
  const [hasAccount, setHasAccount] = useState(true);
  const { dispatch, state, handleSubmitForm } = useAuth();

  return (
    <>
      <form
        className={classes.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitForm("login");
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
        <button className={classes.btn} aria-label="submit-button">
          {hasAccount ? "Login" : "Signup"}
        </button>
        {hasAccount ? (
          <button className={classes.forgetPwdBtn}>Forget password?</button>
        ) : (
          <></>
        )}

        <div>
          <GoogleLogin
            type="icon"
            theme={undefined}
            text="continue_with"
            logo_alignment="center"
            useOneTap={true}
            onSuccess={(res) => handleSetUserData(res)}
            onError={() => console.log("errpr")}
            cancel_on_tap_outside={false}
          />
        </div>
      </form>
    </>
  );
};
