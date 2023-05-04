import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import classes from "@style/Login.module.css";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@hooks/auth/useAuth";
import { useGoogleAuth } from "@hooks/auth/useGoogleAuth";

export const LoginForm: React.FC<{ action: "login" | "signup" }> = ({
  action,
}): JSX.Element => {
  const [pwdIsVisible, setPwdIsVisible] = useState(false);

  const isLogin = action === "login";
  const { handleGoogleLogin } = useGoogleAuth();
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
        <h2>{isLogin ? "Log in" : "Sign up"}</h2>

        {!isLogin && (
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={(e) =>
                dispatch({ type: "SET_USER_NAME", payload: e.target.value })
              }
              value={state.username?.value}
            />
          </div>
        )}

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) =>
              dispatch({ type: "SET_EMAIL", payload: e.target.value })
            }
            value={state.email.value}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type={pwdIsVisible ? "text" : "password"}
            name="pwd"
            id="pwd"
            onChange={(e) =>
              dispatch({ type: "SET_PASSWORD", payload: e.target.value })
            }
            value={state.password.value}
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
        <button
          className={classes.btn}
          aria-label="submit-button"
          onClick={(e) => handleSubmitForm(isLogin ? "login" : "signup")}
        >
          {isLogin ? "Login" : "Signup"}
        </button>
        {isLogin && (
          <button className={classes.forgetPwdBtn}>Forget password?</button>
        )}

        <div>
          <GoogleLogin
            type="icon"
            theme={undefined}
            text="continue_with"
            logo_alignment="center"
            useOneTap={true}
            onSuccess={(res) => handleGoogleLogin(res)}
            onError={() => console.log("errpr")}
            cancel_on_tap_outside={false}
          />
        </div>
      </form>
    </>
  );
};
