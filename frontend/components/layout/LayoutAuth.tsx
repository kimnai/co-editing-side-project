import React, { PropsWithChildren } from "react";
import "@style/Layout.module.css";

export const LayoutAuth: React.FC = (props: PropsWithChildren) => {
  return <main>{props.children}</main>;
};
