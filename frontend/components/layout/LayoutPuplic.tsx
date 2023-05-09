import React, { PropsWithChildren } from "react";
import classes from "@style/Layout.module.css";

export const LayoutPublic = (props: PropsWithChildren) => {
  return (
    <div className={classes.container}>
      <main className={classes.main}>{props.children}</main>
    </div>
  );
};
