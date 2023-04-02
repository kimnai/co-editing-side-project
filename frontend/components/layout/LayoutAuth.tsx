import React, { PropsWithChildren } from "react";
import classes from "@style/Layout.module.css";
import { useGoogleAuth } from "@hooks/useGoogleAuth";
import { Aside } from "./Aside";

export const LayoutAuth = (props: PropsWithChildren) => {
  const { handleGoogleLogout } = useGoogleAuth();

  return (
    <div className={classes.container}>
      <nav className={classes.nav}>
        <button onClick={handleGoogleLogout}>Log out</button>
      </nav>
      <Aside />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
};
