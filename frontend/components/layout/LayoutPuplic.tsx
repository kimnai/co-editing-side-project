import React, { PropsWithChildren } from "react";
import classes from "@style/Layout.module.css";
import { Aside } from "./Aside";
import { Nav } from "./Nav";

export const LayoutPublic: React.FC = (
  props: PropsWithChildren
): JSX.Element => {
  return (
    <div className={classes.container}>
      <Nav />
      <Aside />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
};
