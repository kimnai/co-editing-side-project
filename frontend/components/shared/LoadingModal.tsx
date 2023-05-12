import { CircularProgress } from "@mui/material";
import classes from "@style/Shared.module.css";
import React from "react";

export const LoadingModal: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <div className={classes.backdrop}>
      <div className={classes["loading-modal"]}>
        <CircularProgress sx={{ color: "white" }} />
        {message && message.length !== 0 && <div>{message}</div>}
      </div>
    </div>
  );
};
