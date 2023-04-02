import React, { PropsWithChildren } from "react";
import classes from "@style/Layout.module.css";
import { Aside } from "./Aside";

export const LayoutPublic = (props: PropsWithChildren) => {
  return (
    <div className={classes.container}>
      <nav className={classes.nav}>
        <div>Sign up</div>
      </nav>
      <main className={classes.main}>{props.children}</main>
    </div>
  );
};
