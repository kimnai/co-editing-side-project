import { Nav } from "@components/layout/Nav";
import React from "react";
import "../styles/globals.css";

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Nav />
        <section>{children}</section>
      </body>
    </html>
  );
};

export default Layout;
