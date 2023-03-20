import React from "react";
import classes from "@style/Layout.module.css";

export const Nav: React.FC = (): JSX.Element => {
  const navItems = ["Sign Up", "Log in"];

  return (
    <nav className={classes.nav}>
      <ul>
        {navItems.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </nav>
  );
};
