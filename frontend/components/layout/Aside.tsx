import React, { useContext } from "react";
import { AsideCtx } from "components/context/AsideStatusProvider";

import classes from "@style/Layout.module.css";
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  Menu,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";

export const Aside: React.FC = () => {
  const { status, setStatus, handleClick } = useContext(AsideCtx);
  const items = ["search", "settings"];

  console.log(status);

  return (
    <aside className={`${classes[status]} ${classes.aside} `}>
      {status !== "open" ? (
        <>
          <IconButton
            className={classes.toggleIcon}
            sx={{ width: "4rem" }}
            onClick={handleClick}
            onMouseEnter={() => setStatus!("hover")}
            onMouseLeave={() => setStatus!("close")}
          >
            {status === "hover" ? <KeyboardDoubleArrowRight /> : <Menu />}
          </IconButton>
        </>
      ) : (
        <></>
      )}
      {status === "open" ? (
        <>
          <IconButton onClick={handleClick} className={classes.toggleIcon}>
            <KeyboardDoubleArrowLeft />
          </IconButton>
          {items.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </>
      ) : (
        <></>
      )}
    </aside>
  );
};
