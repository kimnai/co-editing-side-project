import React, { useState } from "react";
import { useRouter } from "next/router";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";

import classes from "@style/Auth.module.css";
import { AuthType } from "@lib/type/auth";
import { criteria } from "@lib/constant/auth";
import { Error, useAuth } from "@hooks/useAuth";

export const Form: React.FC = (): JSX.Element => {
  const [pwdIsVisible, setPwdIsVisible] = useState(false);
  const router = useRouter();
  const { authType } = router.query;
  const formType: AuthType = authType?.includes("login") ? "login" : "signup";
  const { refs, errorState, handleSubmitForm, handleGoogleLogin } =
    useAuth(formType);

  const tabs: { name: AuthType; isActive: boolean }[] = [
    { name: "login", isActive: formType === "login" },
    { name: "signup", isActive: formType === "signup" },
  ];

  const checkFieldHasError = (field: Error["field"]): Error[] => {
    return errorState.filter((e) => e.field === field);
  };

  const getFields = () => {
    return formType === "login"
      ? formField.filter((f) => f.name !== "username")
      : formField;
  };

  const formField = [
    {
      name: "username",
      label: "Username",
      ref: refs.usernameref,
      errors: checkFieldHasError("username"),
      adornments: null,
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      adornments: null,
      ref: refs.emailRef,
      errors: checkFieldHasError("email"),
    },
    {
      name: "password",
      type: pwdIsVisible ? "text" : "password",
      label: "Password",
      ref: refs.passwordRef,
      adornments: (
        <IconButton
          size="medium"
          onClick={() => setPwdIsVisible((prev) => !prev)}
          className={classes.adornment}
        >
          {pwdIsVisible ? (
            <Visibility fontSize="medium" />
          ) : (
            <VisibilityOff fontSize="medium" />
          )}
        </IconButton>
      ),
      errors: checkFieldHasError("password"),
    },
  ];

  return (
    <form
      className={classes.form}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmitForm();
      }}
    >
      <div className={classes.tabs}>
        {tabs.map((t) => (
          <div
            key={t.name}
            className={`${classes.tab} ${
              t.isActive ? classes["tab-active"] : ""
            }`}
            onClick={() => router.push(`/auth/${t.name}`)}
          >
            {t.name}
          </div>
        ))}
      </div>

      <div className={classes.formFields}>
        {errorState
          .filter((e) => e.field === "global")
          .map((e) => (
            <div key={e.message} className={classes.hint}>
              {e.message}
            </div>
          ))}
        {getFields().map((f, i) => (
          <div key={f.name} className={classes.field}>
            <label htmlFor={f.name}>{f.label}</label>
            {
              <Tooltip title={criteria[f.name].hint} arrow placement="bottom">
                <input
                  ref={f.ref}
                  type={f.type}
                  className={f.errors.length > 0 ? classes["input-error"] : ""}
                />
              </Tooltip>
            }

            {f.adornments !== null && f.adornments}
            {f.errors.length > 0 &&
              f.errors.map((e) => (
                <div className={classes.hint} key={`${e.field}_${e.type}`}>
                  {criteria[e.field].hint}
                </div>
              ))}
          </div>
        ))}
        <button>{tabs.find((t) => t.isActive)?.name ?? tabs[0].name}</button>

        <div className={classes.thirdParty}>
          <div>Or continue with</div>
          <GoogleLogin
            type="icon"
            logo_alignment="center"
            onSuccess={(res) => handleGoogleLogin(res, formType)}
            onError={() => console.log("error")}
            containerProps={{ style: { margin: "auto" } }}
          />
        </div>
      </div>
    </form>
  );
};
