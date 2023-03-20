import React, { PropsWithChildren } from "react";
import "@style/Layout.module.css";
import { Nav } from "./Nav";
import { Aside } from "./Aside";
import classes from "@style/Layout.module.css";

export const LayoutAuth: React.FC = (props: PropsWithChildren): JSX.Element => {
  return (
    <div className={classes.container}>
      <Nav />
      <Aside />
      <main className={classes.main}>{props.children}</main>;
    </div>
  );
};
