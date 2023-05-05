import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";

import classes from "@style/Auth.module.css";
import { AuthType } from "@lib/type/auth";
import { criteria } from "@lib/constant/auth";
import { Error, useAuth } from "@hooks/useAuth";

export const Form: React.FC = (): JSX.Element => {
  const [pwdIsVisible, setPwdIsVisible] = useState(false);
  const { query } = useRouter();
  const { auth } = query;
  const formType: AuthType = auth?.includes("login") ? "login" : "signup";
  const { refs, errorState, handleSubmitForm } = useAuth(formType);

  const tabs = [
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
      action="submit"
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
          >
            <Link href={`/${t.name}`}>{t.name}</Link>
          </div>
        ))}
      </div>

      <div className={classes.formField}>
        {getFields().map((f) => (
          <div key={f.name}>
            <label htmlFor={f.name}>{f.label}</label>
            <input
              ref={f.ref}
              type={f.type}
              className={f.errors.length > 0 ? classes["input-error"] : ""}
            />
            {f.adornments !== null && f.adornments}
            {f.errors.length > 0 &&
              f.errors.map((e) => (
                <div className={classes.hint} key={`${e.field}_${e.type}`}>
                  {e.type === "length" && e.field !== "email"
                    ? `${e.field} length should be greater than ${
                        criteria[e.field].minLength
                      }`
                    : `Invalid ${e.field} pattern`}
                </div>
              ))}
          </div>
        ))}
        <button>{tabs.find((t) => t.isActive)?.name ?? tabs[0].name}</button>
      </div>
    </form>
  );
};
