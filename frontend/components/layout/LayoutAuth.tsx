import React, { PropsWithChildren, useEffect } from "react";
import classes from "@style/Layout.module.css";
import { Aside } from "./Aside";
import { useVerifyToken } from "@hooks/auth/useVerifyToken";
import { Nav } from "./Nav";
import dynamic from "next/dynamic";

export const LayoutAuth = (props: PropsWithChildren) => {
  useVerifyToken();

  return (
    <div className={classes.container}>
      <Nav />
      <Aside />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
};
