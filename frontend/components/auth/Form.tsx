import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import classes from "@style/Auth.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

export const Form: React.FC = (): JSX.Element => {
  const [pwdIsVisible, setPwdIsVisible] = useState(false);
  const { query } = useRouter();
  const { auth } = query;
  const formType: "login" | "signup" = auth?.includes("login")
    ? "login"
    : "signup";

  const tabs = [
    { name: "login", isActive: formType === "login" },
    { name: "signup", isActive: formType === "signup" },
  ];

  const formField = [
    {
      name: "username",
      label: "Username",
      value: "",
      isValid: true,
      adornments: null,
      handleChange: () => {},
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      adornments: null,
      value: "",
      isValid: true,
      handleChange: () => {},
    },
    {
      name: "password",
      type: pwdIsVisible ? "text" : "password",
      label: "Password",
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
      value: "",
      isValid: true,
      handleChange: () => {},
    },
  ];

  const getFields = () => {
    return formType === "login"
      ? formField.filter((f) => f.name !== "username")
      : formField;
  };

  return (
    <form action="submit" className={classes.form}>
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
              type={f.type}
              value={f.value}
              onChange={(e) => f.handleChange()}
              className={!f.isValid ? classes["input-error"] : ""}
            />
            {f.adornments !== null && f.adornments}
          </div>
        ))}
        <button>{tabs.find((t) => t.isActive)?.name ?? tabs[0].name}</button>
      </div>
    </form>
  );
};
