import React, { PropsWithChildren } from "react";
import classes from "@style/Layout.module.css";
import { Nav } from "./Nav";

export const LayoutPublic = (props: PropsWithChildren) => {
  return (
    <>
      <Nav />
      <main className={classes.main}>{props.children}</main>
    </>
  );
};
